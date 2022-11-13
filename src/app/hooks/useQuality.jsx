import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { qualityService } from "../services/qualitites.service";
import { useErrorCatch } from "./useErrorCatch";

const QualityContext = React.createContext();

export const useQualities = () => useContext(QualityContext);

export const QualityProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [qualities, setQualitites] = useState([]);
    const { catchError } = useErrorCatch();

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

    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
