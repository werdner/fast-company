import React from "react";

const Qualitie = ({qualities}) => qualities.map(qualitie => {
        const classes = "badge m-1 bg-" + qualitie.color;
        return <div className={classes} key={qualitie.name}>{qualitie.name}</div>
    }
);

export default Qualitie;