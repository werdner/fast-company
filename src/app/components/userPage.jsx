import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";

const UserPage = ({ name, profession, qualities, completedMeetings, rate, onAllUsers }) => {
    return (
        <div>
            <dl>
                <dt className="fs-2">{name}</dt>
                <dd className="fs-3 fw-bold">{"Профессия: " + profession.name}</dd>
                <dd><QualitiesList qualities={qualities}/></dd>
                <dd>{"CompletedMeetings: " + completedMeetings}</dd>
                <dd className="fw-bold">{"Rate: " + rate}</dd>
            </dl>
            <button onClick={onAllUsers}>Все Пользователи</button>
        </div>
    );
};

UserPage.propTypes = {
    name: PropTypes.string.isRequired,
    profession: PropTypes.object.isRequired,
    qualities: PropTypes.array.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onAllUsers: PropTypes.func.isRequired
};

export default UserPage;
