import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error,
    name
}) => {
    const optionsArray = !Array.isArray(options) && typeof options === "object"
        ? Object.values(options)
        : options;

    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const handleChange = ({ target }) => {
        console.log("TARGET", target);
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            {label && <label htmlFor={name} className="form-label">{label}</label>}
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option value="" key='emptySelect' disabled>{ value || defaultOption}</option>

                {optionsArray.length > 0 &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}

            </select>
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    );
};

SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    name: PropTypes.string.isRequired
};

export default SelectField;
