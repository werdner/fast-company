import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { professionService } from "../services/professions.service";
import { useErrorCatch } from "./useErrorCatch";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [professions, setprofessions] = useState([]);
    const { catchError } = useErrorCatch();

    useEffect(() => {
        getProfessionsList();
    }, []);

    async function getProfessionsList() {
        try {
            const { content } = await professionService.get();
            setprofessions(content);
        } catch (error) {
            catchError(error);
        } finally {
            setIsLoading(false);
        }
    }

    function getProfession(id) {
        return professions.find(profession => profession._id === id);
    }

    return (
        <ProfessionContext.Provider value={{ isLoading, professions, getProfession }}>
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
