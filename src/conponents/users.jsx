import React, {useState} from "react";
import api from "../api";
import SearchStatus from "./searchStatus";
import User from "./user";


const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState =>  prevState.filter(user => user._id !== userId));
    }

    if (users.length <= 0) return <SearchStatus number={users.length}/>;

    return (
        <>  
            <SearchStatus number={users.length}/>
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
                        {users.map(user => <User key={user._id} user={user} onDelete={handleDelete} />)}
                </tbody>
            </table>
        </>
    )
}

export default Users;
