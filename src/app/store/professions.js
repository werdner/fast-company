import { createSlice } from "@reduxjs/toolkit";
import { professionService } from "../services/professions.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsRecieved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsRecieved, professionsRequestFailed } = actions;

function isOutOfDate(date) {
    if (Date.now() - date > 600000) {
        return true;
    }
    return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;

    if (!isOutOfDate(lastFetch)) return;

    dispatch(professionsRequested());

    try {
        const { content } = await professionService.get();
        dispatch(professionsRecieved(content));
    } catch (error) {
        dispatch(professionsRequestFailed(error.message));
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;
export const getProfessionById = (professionId) => (state) => {
    if (state.professions.entities) {
        for (const profession of state.professions.entities) {
            if (profession._id === professionId) {
                return profession;
            }
        }

        return;
    }
    return [];
};

export default professionsReducer;
