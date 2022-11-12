import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.apiEndPoint;

function transformData(data) {
    console.log("data", data);
    return data ? Object.keys(data).map(key => {
        console.log("data", data, "key", key);
        return { ...data[key] };
    }) : [];
}

axios.interceptors.response.use((res) => {
    console.log("res", res);
    if (configFile.isFireBase) res.data = { content: transformData(res.data) };
    return res;
}, function (error) {
    const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

    if (!expectedErrors) {
        toast.error("Unexpected Error");
    }
    return Promise.reject(error);
});

axios.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            const configs = { ...config };
            console.log("containSlash", containSlash);
            console.log("config", configs);
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            return config;
        }
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
