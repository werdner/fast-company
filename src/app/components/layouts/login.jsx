import React, { useState, useEffect } from "react";
import TextField from "../textField";
import { validator } from "../../utils/validator";

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

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email field is required"
            },
            isEmail: {
                message: "Incorrect email"
            }
        },
        password: {
            isRequired: {
                message: "Password field is required"
            },
            isCapitalSymbol: {
                message: "Password must contain at least one capital character"
            },
            isContainDigit: {
                message: "Password must contain at least one digit"
            },
            min: {
                message: "Password must have at least 8 characters",
                value: 8
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length !== 0;
    };

    const isValid = Object.keys(errors).length !== 0;
    console.log(isValid);

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <div className="container mt-5">
            <div className="row justifyContent">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
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
                        <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={isValid}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
