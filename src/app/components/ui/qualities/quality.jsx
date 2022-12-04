import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getQualitiesLoadingStatus } from "../../../store/qualities";
const Quality = ({ _id, color, name }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());
    return (
        !isLoading ? (
            <span className={"badge m-1 bg-" + color} key={_id}>
                {name}
            </span>
        ) : "Loading..."
    );
};
Quality.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default Quality;
