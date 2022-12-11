import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { commentService } from "../services/comments.service";
import { quickSort } from "../utils/quickSort";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(comment => comment._id !== action.payload);
        },
        commentCreated: (state, action) => {
            state.entities = quickSort([...state.entities, action.payload]);
        },
        commentError: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsRecieved, commentsRequestFailed, commentRemoved, commentError, commentCreated } = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());

    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsRecieved(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const removeComment = (id) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) dispatch(commentRemoved(id));
    } catch (error) {
        commentError(error);
    }
};

export const createComment = (data, pageId, userId) => async (dispatch) => {
    const comment = {
        ...data,
        _id: nanoid(),
        pageId,
        created_at: Date.now(),
        userId
    };

    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        commentError(error);
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
