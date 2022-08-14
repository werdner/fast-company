import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../api";
import UserPage from "../userPage";
import UsersList from "../usersList";

const Users = () => {
    const [userData, setUserData] = useState();
    const { userId } = useParams();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId)
            .then(user => setUserData(user));
    }, [userId]);

    const handleUsers = () => {
        history.push("/users");
    };

    if (userId) {
        return userData
            ? <UserPage {...userData} onAllUsers={handleUsers} />
            : "Loading...";
    } else {
        return <UsersList />;
    }
};

export default Users;
