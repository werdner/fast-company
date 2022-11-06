import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQuality";
const Quality = ({ id }) => {
    const { isLoading, getQuality } = useQualities();
    console.log("id", id);
    const { name, _id, color } = getQuality(id);
    return (
        !isLoading ? (
            <span className={"badge m-1 bg-" + color} key={_id}>
                {name}
            </span>
        ) : "Loading..."
    );
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
