import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserProvider } from "../../hooks/useUsers";
import UserPage from "../page/userPage";
import UsersListPage from "../page/usersListPage/usersListPage";
import UserEditForm from "../page/userEditForm";

export const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const { currentUser } = useAuth();
    return (
        <UserProvider>
            {userId ? (
                edit ? (
                    currentUser._id === userId
                        ? <UserEditForm />
                        : <Redirect to={`users/${currentUser._id}/edit`} />
                ) : (
                    <UserPage />
                )
            ) : (
                <UsersListPage />
            )}
        </UserProvider>

    );
};
