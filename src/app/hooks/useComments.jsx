import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { commentService } from "../services/comments.service";
import { useErrorCatch } from "./useErrorCatch";
import { quickSort } from "../utils/quickSort";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const CommentsContex = React.createContext();

export const useComments = () => {
    return useContext(CommentsContex);
};

export const CommentsProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const currentUserId = useSelector(getCurrentUserId());
    const { userId } = useParams();
    const { catchError } = useErrorCatch();

    async function createComments(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };

        try {
            const { content } = await commentService.createComment(comment);
            setComments(prevState => quickSort([...prevState, content]));
        } catch (error) {
            catchError(error);
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            setComments(quickSort(content));
        } catch (error) {
            catchError(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function removeComment(id) {
        try {
            const { content } = await commentService.removeComment(id);
            if (content === null) setComments(prevState => prevState.filter(comment => comment._id !== id));
        } catch (error) {
            catchError(error);
        }
    }

    useEffect(() => {
        getComments();
    }, [userId]);

    return (
        <CommentsContex.Provider value={{ isLoading, comments, createComments, removeComment }}>
            {children}
        </CommentsContex.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
