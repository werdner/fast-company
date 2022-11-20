import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useErrorCatch = () => {
    const [error, setError] = useState(null);

    useEffect(() => {
        error !== null && toast.error(error);
        clearError();
    }, [error]);

    const catchError = useCallback((error) => {
        const { message } = error.response.data.error;
        setError(message);
    }, [error]);

    function clearError() { setError(null); }

    return { error, catchError };
};
