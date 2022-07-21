import React, { useState } from "react";
import api from "../api";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import User from "./user";
import { paginate } from "../utils/paginate";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const [currentPage, setCurrentPage] = useState(1);
    const count = users.length;
    const pageSize = 4;

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    if (count <= 0) return <SearchStatus number={count} />;

    return (
        <>
            <SearchStatus number={count} />
            <table className="table">
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Качества</th>
                        <th>Профессия</th>
                        <th>Встретился, раз</th>
                        <th>Оценка</th>
                        <th>Избранное</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userCrop.map((user) => (
                        <User key={user._id} user={user} onDelete={handleDelete} />
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default Users;
