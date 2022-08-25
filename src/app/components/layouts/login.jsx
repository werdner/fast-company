import React, { useState, useEffect } from "react";
import TextField from "../textField";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const handleChange = ({ target }) => {
        setData(prevState => (
            {
                ...prevState,
                [target.name]: target.value
            }
        ));
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = {};

        for (const fieldName in data) {
            if (data[fieldName].trim() === "") {
                errors[fieldName] = `${fieldName} обязательно для заполнения!`;
            }
        }

        setErrors(errors);
        return Object.keys(errors).length !== 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                type="text"
                value={data.email}
                name="email"
                onChange={handleChange}
                error={errors.email}
            />

            <TextField
                label="Password"
                type="password"
                value={data.password}
                name="password"
                onChange={handleChange}
                error={errors.password}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Login;
