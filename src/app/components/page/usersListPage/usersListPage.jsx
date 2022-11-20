import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import SearchUser from "../../searchUser";
import { findPerson } from "../../../utils/findPerson";
import { UserProvider, useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { isLoading: professionsLoading, professions } = useProfessions();
    const [selectedProf, setSelectedProf] = useState();
    const [value, setValue] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 4;

    const { users } = useUser();
    const { currentUser } = useAuth();

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    const handleSearchFieldChange = (e) => {
        const { target } = e;
        clearFilter();
        setValue(target.value);
    };

    if (users) {
        function filterUsers(data) {
            const getUsers = selectedProf
                ? data.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
                : data;

            return getUsers.filter(user => user._id !== currentUser._id);
        }

        const filteredUsers = filterUsers(users);

        const count = filteredUsers ? filteredUsers.length : 0;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const foundedUsers = value.length > 0 ? findPerson(users, value) : 0;

        return (
            <UserProvider>
                <div className="d-flex justify-content-center">
                    {professions && !professionsLoading && (
                        <div className="d-flex flex-column flex-shrin-0 p-3 me-2">
                            <GroupList
                                selectedItem={selectedProf}
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                            />
                            <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
                        </div>
                    )}
                    <div className="d-flex flex-column">
                        <SearchStatus length={foundedUsers.length || count} />
                        <SearchUser value={value} handleChange={handleSearchFieldChange} />
                        {count > 0 && (
                            <UserTable
                                users={foundedUsers || usersCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                                onToggleBookMark={handleToggleBookMark}
                            />
                        )}
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={value.length > 0 ? foundedUsers.length : count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </UserProvider>
        );
    } else {
        return "Loading...";
    }
};
UsersListPage.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default UsersListPage;
