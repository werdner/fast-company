import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "../../ui/qualities/qualitiesList";

export const QualitiesCard = ({ qualities }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text">
                    {qualities ? (
                        <span><QualitiesList qualities={qualities}/></span>
                    ) : "Loading"}
                </p>
            </div>
        </div>
    );
};

QualitiesCard.propTypes = {
    qualities: PropTypes.array
};
