import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import { CommentsContainer } from "./comment/index";
import { CommentForm } from "./newCommtForm";
import { InfoCard, MeetingsCard, QualitiesCard } from "./index";
import { quickSort } from "../../../utils/quickSort";

const UserPage = () => {
    const [userData, setUserData] = useState();
    const [comments, setComments] = useState([]);
    const history = useHistory();
    const { userId } = useParams();

    const handleUsers = () => {
        history.push(`/users/${userId}/edit`);
    };

    useEffect(() => {
        api.users.getById(userId)
            .then(user => setUserData(user));
        api.comments.fetchCommentsForUser(userId)
            .then(comments => {
                const sorted = quickSort(comments);
                setComments(sorted);
            });
    }, []);

    const onSubmit = (data) => {
        api.comments.add({
            pageId: userId,
            userId: data.userId,
            content: data.comment
        }).then(response => console.log(response));
        api.comments.fetchCommentsForUser(userId)
            .then(comments => setComments(comments));
    };

    const onRemove = (commentId) => {
        api.comments.remove(commentId).then(response => console.log(response));
        api.comments.fetchCommentsForUser(userId)
            .then(comments => setComments(comments));
    };
    console.log(comments);

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
                            <div className="card mb-3">
                                <CommentForm userId={userId} onSubmit={onSubmit} />
                            </div>
                            <div className="card mb-3">
                                <CommentsContainer userId={userId} comments={comments} onRemove={onRemove} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : "Loading"}
        </>
    );
};

export default UserPage;
