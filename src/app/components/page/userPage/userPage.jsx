import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { InfoCard, MeetingsCard, QualitiesCard } from "./index";
import { CommentsContainer } from "./comment/index";
import { CommentsProvider } from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = () => {
    const { userId } = useParams();
    const history = useHistory();

    const userData = useSelector(getUserById(userId));

    const handleUsers = () => {
        history.push(`/users/${userId}/edit`);
    };
    return (
        <>
            {userData ? (
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <InfoCard userData={userData} handleUsers={handleUsers} />
                            <QualitiesCard qualities={userData?.qualities} />
                            <MeetingsCard completedMeetings={userData?.completedMeetings}/>
                        </div>
                        <div className="col-md-8">
                            <CommentsProvider>
                                <CommentsContainer userId={userId} />
                            </CommentsProvider>
                        </div>
                    </div>
                </div>
            ) : "Loading"}
        </>
    );
};

export default UserPage;
