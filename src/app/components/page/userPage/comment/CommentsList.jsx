import React from "react";
import PropTypes from "prop-types";
import { Comment } from "./index";

export const CommentsList = ({ comments, onRemove }) => {
    return (
        <>
            {comments.length > 0 ? comments.map(comment => (
                <Comment
                    key={comment._id}
                    commentId={comment._id}
                    userId={comment.userId}
                    content={comment.comment}
                    time={comment.created_at.toString()}
                    onRemove={onRemove}
                />
            )) : "Empty"}
        </>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
};
