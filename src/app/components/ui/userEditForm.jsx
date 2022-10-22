import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import { useHistory, useParams } from "react-router-dom";
import MultiSelectField from "../common/form/multiSelectField";
import RadioField from "../common/form/radioForm";
import SelectField from "../common/form/selectField";
import BackButton from "../common/backButton.jsx";

const UserEditForm = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [professions, setProfessions] = useState({});
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});

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
        api.professions.fetchAll().then((data) => {
            const professionsList =
                Object.keys(data).map((professionName) => ({
                    label: data[professionName].name,
                    value: data[professionName]._id
                }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList =
                Object.keys(data).map((optionName) => ({
                    label: data[optionName].name,
                    value: data[optionName]._id,
                    color: data[optionName].color
                }));
            setQualities(qualitiesList);
        });
        api.users.getById(userId).then((data) => {
            const { name, email, profession, sex } = data;
            const transformedQualities = data.qualities.map(quality => ({
                label: quality.name,
                value: quality._id
            }));

            setData({
                name,
                email,
                profession: profession.name,
                sex,
                qualities: transformedQualities
            });
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

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.label === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        console.log(qualities);
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) return;
        const { profession, qualities } = data;
        api.users.update(userId, ({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        }));

        history.replace(`/users/`);
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
                            options={professions}
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
                            options={qualities}
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
