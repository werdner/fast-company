import React, { useState } from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, onDelete }) => {
    const [status, setStatus] = useState(user.bookmark);

    const handleStatus = () => {
        setStatus(!status);
    };

    return (
        <tr>
            <td>{user.name}</td>
            <td>
                <ul>
                    {user.qualities.map((qualitie) => (
                        <Qualitie key={qualitie._id} qualitie={qualitie} />
                    ))}
                </ul>
            </td>
            <td className="">{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
                <Bookmark status={status} onBookmark={handleStatus} />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default User;
