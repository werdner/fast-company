import React, {useState} from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({user, ...props}) => {
    const [status, setStatus] = useState(user.bookmark);

    const handleStatus = () => {
        setStatus(!status);
    }

    return (
        <tr>
            <td>{user.name}</td>
            <td>
                <ul>
                    <Qualitie qualities={user.qualities} />
                </ul>
            </td>
            <td className="">{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
                <Bookmark status={status} onBookmark={handleStatus}/>
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => props.onDelete(user._id)}>delete</button>
            </td>
        </tr>
    )
}
    

export default User;
