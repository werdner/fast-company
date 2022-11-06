import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { userService } from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getUsersList() {
        try {
            const { content } = await userService.get();
            setUsers(content);
        } catch (error) {
            catchError(error);
        } finally {
            setIsLoading(false);
        }
    }

    function catchError(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        getUsersList();
    }, []);

    useEffect(() => {
        error !== null && toast.error(error);
        setError(null);
    }, [error]);

    return (
        <UserContext.Provider value={users}>
            {!isLoading ? children : "Loading..."}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
