import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useHistory } from "react-router-dom";
import MultiSelectField from "../common/form/multiSelectField";
import RadioField from "../common/form/radioForm";
import SelectField from "../common/form/selectField";
import BackButton from "../common/backButton.jsx";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesById } from "../../store/qualities";
import { getProfessions } from "../../store/professions";

const UserEditForm = () => {
    const professions = useSelector(getProfessions());
    const { currentUser, updateUserProfile } = useAuth();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const getTrasformedQualities = (elements) => {
        const qualitiesArray = elements.map(elem => elem.value);
        return qualitiesArray;
    };

    const qualities = useSelector(getQualities());
    const qualitiesList = useSelector(getQualitiesById(getTrasformedQualities(qualities)));

    const history = useHistory();

    const professionList = professions.map(profession => ({
        value: profession._id,
        label: profession.name
    }));
    const qulitiesList = qualities.map(quality => ({
        value: quality._id,
        label: quality.name
    }));

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

    useEffect(() => {
        setData({
            ...currentUser,
            qualities: qualitiesList
        });
    }, []);

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Name field is required"
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
        profession: {
            isRequired: {
                message: "Profession required"
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
        const { qualities } = data;
        const newData = {
            ...data,
            qualities: getTrasformedQualities(qualities)
        };
        await updateUserProfile(newData);
        history.replace(`/users/${currentUser._id}`);
    };

    return (
        <div className="container mt-5">
            <BackButton />
            <div className="row justifyContent">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>

                        <TextField
                            label="Name"
                            type="text"
                            value={data.name}
                            name="name"
                            onChange={handleChange}
                            error={errors.password}
                        />

                        <TextField
                            label="Email"
                            type="text"
                            value={data.email}
                            name="email"
                            onChange={handleChange}
                            error={errors.email}
                        />

                        <SelectField
                            name="profession"
                            defaultOption="Choose..."
                            options={professionList}
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
                            options={qulitiesList}
                            onChange={handleChange}
                            name="qualities"
                            label="Select your quality"
                            defaultValue={data.qualities}
                        />

                        <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={isValid}>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserEditForm;
