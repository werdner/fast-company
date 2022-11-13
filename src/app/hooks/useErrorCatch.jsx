import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useErrorCatch = () => {
    const [error, setError] = useState(null);

    useEffect(() => {
        error !== null && toast.error(error);
        clearError();
    }, [error]);

    function catchError(error) {
        const { message } = error.response.data.error;
        setError(message);
    }

    function clearError() { setError(null); }

    return { error, catchError };
};
