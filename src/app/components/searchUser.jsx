import React from "react";
import PropTypes from "prop-types";

const SearchUser = ({ value, handleChange }) => {
    return (
        <div>
            <input className="w-100" type="text" value={value} onChange={handleChange} />
        </div>
    );
};

SearchUser.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default SearchUser;
