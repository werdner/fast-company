import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { CommentsList } from "./index";
import { CommentForm } from "../newCommtForm";
import { useComments } from "../../../../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import { getComments, getCommentsLoadingStatus, loadCommentsList } from "../../../../store/comments";

export const CommentsContainer = ({ userId }) => {
    const { createComments, removeComment } = useComments();
    const comments = useSelector(getComments());
    const isLoading = useSelector(getCommentsLoadingStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const onSubmit = (data) => {
        createComments(data);
    };

    const onRemove = (commentId) => {
        removeComment(commentId);
    };

    return (
        <>
            <div className="card mb-3">
                <CommentForm userId={userId} onSubmit={onSubmit} />
            </div>
            <div className="card mb-3">
                <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    {!isLoading ? (
                        <CommentsList comments={comments} onRemove={onRemove}/>
                    ) : "Loading..."}
                </div>
            </div>
        </>
    );
};

CommentsContainer.propTypes = {
    userId: PropTypes.string.isRequired
};
