import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";

const UserPage = () => {
    const [userData, setUserData] = useState();
    const history = useHistory();
    const { userId } = useParams();

    const handleUsers = () => {
        history.replace(`/users/${userId}/edit`);
    };

    useEffect(() => {
        api.users.getById(userId)
            .then(user => setUserData(user));
    }, []);

    return (
        <>
            {userData
                ? (
                    <div>
                        <dl>
                            <dt className="fs-2">{userData.name}</dt>
                            <dd className="fs-3 fw-bold">{"Профессия: " + userData.profession.name}</dd>
                            <dd><QualitiesList qualities={userData.qualities}/></dd>
                            <dd>{"CompletedMeetings: " + userData.completedMeetings}</dd>
                            <dd className="fw-bold">{"Rate: " + userData.rate}</dd>
                        </dl>
                        <button onClick={handleUsers}>Изменить</button>
                    </div>
                )
                : "Loading..."
            }
        </>
    );
};

export default UserPage;
