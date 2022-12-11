import { createAction, createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/auth.service";
import { localStorageService } from "../services/localStorage.service";
import { userService } from "../services/user.service";
import { getRandomInt } from "../utils/getRandomInt";
import { history } from "../utils/history";

const initialState = localStorageService.getAccesstoken() ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLoggedIn: true,
    dataLoaded: false
} : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersRecieved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFaild: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        updateUserProfile: (state, action) => {
            state.entities = state.entities.map(user => {
                if (user._id === action.payload._id) return action.payload;
                return user;
            });
        },
        userUpdateFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;

const {
    usersRequested,
    usersRecieved,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFaild,
    userCreated,
    userLoggedOut,
    userUpdateFailed,
    updateUserProfile
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserField = createAction("users/createUserField");

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());

    try {
        const { content } = await userService.get();
        dispatch(usersRecieved(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const login = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        dispatch(authRequestSuccess({
            userId: data.localId
        }));
        localStorageService.setTokens(data);
        history.push(redirect);
    } catch (error) {
        dispatch(authRequestFaild(error.message));
    }
};

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({
            userId: data.localId
        }));
        dispatch(createUser({
            _id: data.localId,
            email,
            rate: getRandomInt(1, 5),
            completedMeetings: getRandomInt(0, 200),
            image: `https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`,
            ...rest
        }));
    } catch (error) {
        dispatch(authRequestFaild(error.message));
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthdata();
    dispatch(userLoggedOut);
    history.push("/");
};

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested(payload));
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(createUserField(error.message));
        }
    };
};

export const updateUserData = (data) => async (dispatch) => {
    try {
        const { content } = await userService.update(data);
        dispatch(updateUserProfile(content));
    } catch (error) {
        userUpdateFailed(error);
    }
};

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find(user => user._id === userId);
    }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersList = () => (state) => state.users.entities;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find(user => user._id === state.users.auth.userId)
        : null;
};
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export default usersReducer;
