import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ qualitie }) => {
    const classes = "badge m-1 bg-" + qualitie.color;
    return (
        <li className={classes} key={qualitie.name}>
            {qualitie.name}
        </li>
    );
};

Qualitie.propTypes = {
    qualitie: PropTypes.object.isRequired
};

export default Qualitie;
