import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../page/userPage";
import UsersListPage from "../page/usersListPage/usersListPage";
import UserEditForm from "../page/userEditForm";
import UsersLoader from "../ui/hoc/usersLoader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

export const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());
    return (
        <UsersLoader>
            {userId ? (
                edit ? (
                    currentUserId === userId
                        ? <UserEditForm />
                        : <Redirect to={`users/${currentUserId}/edit`} />
                ) : (
                    <UserPage />
                )
            ) : (
                <UsersListPage />
            )}
        </UsersLoader>

    );
};
