import React, { useState } from "react";
import TextAreaField from "../../../common/form/textAreaField";
import { validator } from "../../../../utils/validator";
import PropTypes from "prop-types";

export const CommentForm = ({ onSubmit }) => {
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});

    const handleChange = (target) => {
        setData(prevState => (
            {
                ...prevState,
                [target.name]: target.value
            }
        ));
    };

    const clearForm = () => {
        setData({});
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length !== 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) return;
        setErrors({});
        clearForm();
        onSubmit(data);
    };

    const validatorConfig = {
        comment: {
            isRequired: {
                message: "Comment field is required"
            }
        }
    };

    return (
        <div className="card-body">
            <form onSubmit={handleSubmit}>
                <h2>New comment</h2>
                <TextAreaField
                    name="comment"
                    onChange={handleChange}
                    value={data.comment ?? ""}
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
