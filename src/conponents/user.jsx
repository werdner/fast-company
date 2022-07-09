import React, {useState} from "react";
import api from "../api";
import RenderPhrase from "./phrase";


const Users = () => {

    const [users, setUsers] = useState(api.users.fetchAll())

    const renderQualities = (user) => {
        return user.map(qualitie => {
            const classes = "badge m-1 bg-" + qualitie.color;
            return <div className={classes} key={qualitie.name}>{qualitie.name}</div>
        });
    }

    const handleDelete = (userId) => {
        setUsers(prevState =>  {
           return prevState.filter(user => user._id !== userId);
        })
    }

    const renderRows = () => {
        return users.map(user => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                    <div>
                        {renderQualities(user.qualities)}
                    </div>
                </td>
                <td className="">{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td><button className="btn btn-danger" onClick={() => handleDelete(user._id)}>delete</button></td>
            </tr>
        ))
    }

    return (
        <>  
            <RenderPhrase number={users.length}/>
            <table className="table">
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Качества</th>
                        <th>Профессия</th>
                        <th>Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                        {renderRows()}
                </tbody>
            </table>
        </>
    )
}

export default Users;