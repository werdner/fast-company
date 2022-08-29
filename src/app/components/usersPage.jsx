import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import SearchUser from "./searchUser";
import { findPerson } from "../utils/findPerson";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [value, setValue] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 4;

    const [users, setUsers] = useState();

    useEffect(() => {
        api.users
            .fetchAll()
            .then(response => setUsers(response));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions
            .fetchAll()
            .then(response => setProfession(response));
    }, []);

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
        const filterUsers = selectedProf
            ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users;

        const count = filterUsers ? filterUsers.length : 0;
        const sortedUsers = _.orderBy(filterUsers, [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const foundedUsers = 0 || findPerson(users, value);

        return (
            <div className="d-flex justify-content-center">
                {professions && (
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
                            itemsCount={foundedUsers.length > 0 ? foundedUsers.length : count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return "Loading...";
    }
};
UsersList.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default UsersList;
