import React from "react";
import { useHistory } from "react-router-dom";

const BackButton = () => {
    const history = useHistory();
    console.log(history);
    return (
        <button
            onClick={() => history.goBack()}
            className="btn btn-primary"
        >
            <i className="bi bi-caret-left"></i>
            Назад
        </button>
    );
};

export default BackButton;
