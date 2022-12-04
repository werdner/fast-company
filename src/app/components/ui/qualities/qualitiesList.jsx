import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useDispatch, useSelector } from "react-redux";
import { getQualitiesById, loadQualitiesList } from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const qualitiesList = useSelector(getQualitiesById(qualities));

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    console.log(qualitiesList);
    return (
        <>
            {qualitiesList.map((qual) => {
                return <Quality key={qual._id} {...qual} />;
            })}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
