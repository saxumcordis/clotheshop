import React, {useCallback, useEffect, useState} from "react";

export const useAsync = (f, start = true) => {
    const [executed, setExecuted] = useState(start);
    const execute = useCallback(() => setExecuted(true), [setExecuted]);

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(executed) {
            setLoading(true);
            Promise.resolve(f())
                .then(setData)
                .catch(setError)
                .finally(() => setLoading(false))
        }
    }, [executed]);

    return {execute, loading, data, error}
};