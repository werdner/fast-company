import React from "react";
import PropTypes from "prop-types";
import { CommentsList } from "./index";
import { CommentForm } from "../newCommtForm";
// import { quickSort } from "../../../../utils/quickSort";
import { useComments } from "../../../../hooks/useComments";

export const CommentsContainer = ({ userId }) => {
    const { createComments, comments, removeComment } = useComments();

    const onSubmit = (data) => {
        createComments(data);
        // api.comments.add({
        //     pageId: userId,
        //     userId: data.userId,
        //     content: data.comment
        // }).then(response => console.log(response));
        // api.comments.fetchCommentsForUser(userId)
        //     .then(comments => setComments(comments));
    };

    const onRemove = (commentId) => {
        removeComment(commentId);
        // api.comments.fetchCommentsForUser(userId)
        //     .then(comments => setComments(comments));
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
                    <CommentsList comments={comments} onRemove={onRemove}/>
                </div>
            </div>
        </>
    );
};

CommentsContainer.propTypes = {
    userId: PropTypes.string.isRequired
};
