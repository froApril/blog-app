import axios, { AxiosRequestConfig, CanceledError } from "axios";
import { SetStateAction, useEffect, useState } from "react";

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        axios.get<SetStateAction<T[]>>(endpoint, {signal: controller.signal, ...requestConfig})
             .then((res) => {
                setData(res.data);
                setLoading(false);
             })
             .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
             });
        return ()=> controller.abort();
    }, deps ? [...deps] : []);

    return {data, error, isLoading};
}

export default useData;