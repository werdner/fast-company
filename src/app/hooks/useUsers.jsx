import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { userService } from "../services/user.service";
import { useErrorCatch } from "./useErrorCatch";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { catchError } = useErrorCatch();

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

    useEffect(() => {
        getUsersList();
    }, []);

    return (
        <UserContext.Provider value={users}>
            {!isLoading ? children : "Loading..."}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
