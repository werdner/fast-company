import React from "react";
import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/useProfession";

export const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const profession = getProfession(id);
    return (
        !isLoading ? <p>{profession.name}</p> : "Loading..."
    );
};

Profession.propTypes = {
    id: PropTypes.string.isRequired
};
