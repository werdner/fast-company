import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({users, ...props}) => {
    return users.map(user => {
        return (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                    <div>
                        <Qualitie qualities={user.qualities} />
                    </div>
                </td>
                <td className="">{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td><Bookmark status={user.bookmark} /></td>
                <td><button className="btn btn-danger" onClick={() => props.onDelete(user._id)}>delete</button></td>
            </tr>
        )
    })
}

export default User;