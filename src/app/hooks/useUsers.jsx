import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { userService } from "../services/user.service";
import { useErrorCatch } from "./useErrorCatch";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const { currentUser } = useAuth();
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

    function getUserById(userId) {
        return users.find(user => user._id === userId);
    }

    useEffect(() => {
        if (!isLoading) {
            setUsers(prevState => prevState.map(user => {
                if (user._id === currentUser._id) return currentUser;
                return user;
            }));
        }
    }, [currentUser]);

    useEffect(() => {
        getUsersList();
    }, []);

    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : "Loading..."}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
