import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { qualityService } from "../services/qualitites.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQualities = () => useContext(QualityContext);

export const QualityProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [qualities, setQualitites] = useState([]);
    const [error, setError] = useState(null);
    console.log("qualities", qualities);

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setQualitites(content);
        } catch (error) {
            catchError(error);
        } finally {
            setIsLoading(false);
        }
    }

    function getQuality(id) {
        return qualities.find(quality => quality._id === id);
    }

    useEffect(() => {
        getQualitiesList();
    }, []);

    useEffect(() => {
        error !== null && toast.error(error);
        setError(null);
    }, [error]);

    function catchError(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
