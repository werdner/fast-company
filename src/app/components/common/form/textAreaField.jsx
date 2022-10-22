import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <textarea
                name={name}
                className={getInputClasses()}
                id="exampleFormControlTextarea1"
                rows="3"
                value={value}
                onChange={handleChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
TextAreaField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default TextAreaField;
