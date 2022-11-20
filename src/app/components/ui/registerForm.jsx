import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioForm";
import MultiSelectField from "../common/form/multiSelectField";
import CheckboxField from "../common/form/checkboxField";
import { useQualities } from "../../hooks/useQuality";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        name: "",
        sex: "male",
        qualities: [],
        licence: false
    });

    const { signUp } = useAuth();
    const { qualities } = useQualities();
    const { professions } = useProfessions();
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const qualitiesList = qualities.map(quality => ({ label: quality.name, value: quality._id }));
    const professionsList = professions.map(profession => ({ label: profession.name, value: profession._id }));

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
        name: {
            isRequired: {
                message: "Name is required"
            },
            min: {
                message: "Name must have at least 3 characters",
                value: 3
            }
        },
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
        },
        profession: {
            isRequired: {
                message: "Profession required"
            }
        },
        licence: {
            isRequired: {
                message: "You must agree to the license rights"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length !== 0;
    };

    const isValid = Object.keys(errors).length !== 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map(quality => quality.value)
        };

        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    type="text"
                    value={data.name}
                    name="name"
                    onChange={handleChange}
                    error={errors.name}
                />

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

                <SelectField
                    name="profession"
                    defaultOption="Choose..."
                    options={professionsList}
                    onChange={handleChange}
                    error={errors.profession}
                    value={data.profession}
                    label="Select Profession"
                />

                <RadioField
                    options={[
                        { name: "male", value: "male" },
                        { name: "female", value: "female" },
                        { name: "other", value: "other" }
                    ]}
                    value = {data.sex}
                    name="sex"
                    label="Male"
                    onChange={handleChange}
                />

                <MultiSelectField
                    options={qualitiesList}
                    onChange={handleChange}
                    name="qualities"
                    label="Select your quality"
                    dafaultValue={qualities}
                />

                <CheckboxField
                    value={data.licence}
                    onChange={handleChange}
                    name="licence"
                    error={errors.licence}
                >
                    Agree with <a>licence</a> rules
                </CheckboxField>

                <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={isValid}>Submit</button>
            </form>
        </>
    );
};

export default RegisterForm;
