import React, { useState, useEffect } from "react";
import api from "../../../../api";
import SelectField from "../../../common/form/selectField";
import TextAreaField from "../../../common/form/textAreaField";
import { validator } from "../../../../utils/validator";
import PropTypes from "prop-types";

export const CommentForm = ({ onSubmit }) => {
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({ userId: "", comment: "" });

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const usersList =
                Object.keys(data).map((userName) => ({
                    label: data[userName].name,
                    value: data[userName]._id
                }));
            setUsers(usersList);
        });
    }, []);

    const handleChange = (target) => {
        setData(prevState => (
            {
                ...prevState,
                [target.name]: target.value
            }
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) return;
        setErrors({});
        setData({ userId: "", comment: "" });
        onSubmit(data);
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Select field is required"
            }
        },
        comment: {
            isRequired: {
                message: "Comment field is required"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length !== 0;
    };

    return (
        <div className="card-body">
            <form onSubmit={handleSubmit}>
                <h2>New comment</h2>
                <SelectField
                    name="userId"
                    defaultOption="Choose..."
                    options={users}
                    onChange={handleChange}
                    error={errors.userId}
                />
                <TextAreaField
                    name="comment"
                    onChange={handleChange}
                    value={data.comment}
                    label="Сообщение"
                    error={errors.comment}
                />
                <button className="btn btn-primary d-block mb-2 ms-auto">Опубликовать</button>
            </form>
        </div>
    );
};

CommentForm.propTypes = {
    userId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};
