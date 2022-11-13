import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { userService } from "../services/user.service";
import { useErrorCatch } from "./useErrorCatch";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const { catchError } = useErrorCatch();

    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureKey: true });
            setTokens(data);

            await createUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            catchError(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "Пользователь с таким email уже существует" };
                    throw errorObject;
                }
            }
            throw new Error(message);
        }
    };

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setCurrentUser(content);
        } catch (error) {
            catchError(error);
        }
    }

    return (
        <AuthContext.Provider value={{ signUp, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
