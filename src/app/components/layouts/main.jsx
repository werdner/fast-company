import React from "react";
import { useMockData } from "../../utils/mockData";

const Main = () => {
    const { error, progress, status, initialize } = useMockData();
    const handleClick = () => {
        initialize();
    };

    return (
        <div className="container mt-5">
            <h1>Main</h1>
            <h3>Инициализация данных в fireBase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}%</li>
                {error && <li>Error: {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>Инициализировать</button>
        </div>
    );
};

export default Main;
