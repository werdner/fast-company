import React from "react";
import PropTypes from "prop-types";
import { CommentsList } from "./index";

export const CommentsContainer = ({ userId, comments, onRemove }) => {
    return (
        <div className="card-body">
            <h2>Comments</h2>
            <hr />
            <CommentsList comments={comments} onRemove={onRemove}/>
        </div>
    );
};

CommentsContainer.propTypes = {
    userId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
};
