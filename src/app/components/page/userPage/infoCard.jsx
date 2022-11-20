import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";

export const InfoCard = ({ userData, handleUsers }) => {
    const { currentUser } = useAuth();
    return (
        <div className="card mb-3">
            <div className="card-body">
                {(currentUser._id === userData._id) && (
                    <button onClick={handleUsers} className="position-absolute top-0 end-0 btn btn-light btn-sm">
                        <i className="bi bi-gear" />
                    </button>
                )}
                <div
                    className="d-flex flex-column align-items-center text-center position-relative"
                >
                    <img
                        src={userData.image}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="150"
                        height="150"
                    />
                    {userData
                        ? (
                            <div>
                                <h4 className="fs-2">{userData.name}</h4>
                                <p className="text-secondary mb-1">{userData.profession.name}</p>
                                <div className="text-muted">
                                    <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                                    <i className="bi bi-caret-up text-secondary" role="button"></i>
                                    <span className="ms-2">{userData.rate}</span>
                                </div>
                            </div>
                        )
                        : "Loading..."
                    }
                </div>
            </div>
        </div>
    );
};

InfoCard.propTypes = {
    userData: PropTypes.object,
    handleUsers: PropTypes.func
};
