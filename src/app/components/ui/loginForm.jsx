import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckboxField from "../common/form/checkboxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const loginError = useSelector(getAuthErrors());

    const handleChange = (target) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid) return;

        const { pathname } = history.location?.state ?? {};

        const redirect = (pathname && pathname !== "/login") || "/";
        dispatch(login({ payload: data, redirect }));
    };

    return (
        <>
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

                <CheckboxField
                    value={data.stayOn}
                    onChange={handleChange}
                    name="stayOn"
                    error={errors.licence}
                >
                    Remember me
                </CheckboxField>

                {loginError && <p className="text-danger">{loginError}</p>}

                <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={isValid}>Submit</button>
            </form>
        </>
    );
};

export default LoginForm;
