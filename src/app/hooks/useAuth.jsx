import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { userService } from "../services/user.service";
import { useErrorCatch } from "./useErrorCatch";
import { localStorageService, setTokens } from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { catchError } = useErrorCatch();
    const histoy = useHistory();

    useEffect(() => {
        if (localStorageService.getAccesstoken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            console.log("content", content);
            setCurrentUser(content);
        } catch (error) {
            catchError(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post("accounts:signUp", {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            catchError();
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function logIn({ email, password }) {
        try {
            const { data } = await httpAuth.post("accounts:signInWithPassword", {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await getUserData();
        } catch (error) {
            catchError(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND" || message === "INVALID_PASSWORD") {
                    const errorObject = {
                        email: "Неверный логин или пароль"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function logOut() {
        localStorageService.removeAuthdata();
        setCurrentUser(null);
        histoy.push("/");
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
        } catch (error) {
            catchError(error);
        }
    }

    async function updateUserProfile(data) {
        try {
            const { content } = await userService.update(data);
            setCurrentUser(content);
        } catch (error) {
            catchError(error);
        }
    }

    return (
        <AuthContext.Provider value={{ signUp, logIn, currentUser, logOut, updateUserProfile }}>
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
