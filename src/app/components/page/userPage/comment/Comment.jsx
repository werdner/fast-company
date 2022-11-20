import React from "react";
import PropTypes from "prop-types";
import { timeHasPassed } from "../../../../utils/timeHasPassed";
import { useUser } from "../../../../hooks/useUsers";
import { useAuth } from "../../../../hooks/useAuth";

export const Comment = ({ userId, content, time, commentId, onRemove }) => {
    const { getUserById } = useUser();
    const { currentUser } = useAuth();
    const user = getUserById(userId);

    const handleClick = () => {
        onRemove(commentId);
    };

    const timePassed = timeHasPassed(time);

    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src={user.image}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                        <span className="me-2">{user.name}</span>
                                        <span className="small">
                                            {timePassed}
                                        </span>
                                    </p>
                                    {currentUser._id === userId && (
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={handleClick}
                                        >
                                            <i className="bi bi-x-lg" />
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    userId: PropTypes.string,
    commentId: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired
};
