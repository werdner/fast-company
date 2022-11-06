import React from "react";
import { useParams } from "react-router-dom";
import { UserProvider } from "../../hooks/useUsers";
import UserPage from "../page/userPage";
import UsersListPage from "../page/usersListPage/usersListPage";
import UserEditForm from "../ui/userEditForm";

export const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <UserProvider>
            {userId ? (
                edit ? (
                    <UserEditForm />
                ) : (
                    <UserPage />
                )
            ) : (
                <UsersListPage />
            )}
        </UserProvider>

    );
};
