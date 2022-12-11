import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import { authService } from "./auth.service";
import { localStorageService } from "./localStorage.service";

const http = axios.create({
    baseURL: configFile.apiEndPoint
});

function transformData(data) {
    return data && !data._id ? Object.keys(data).map(key => {
        return { ...data[key] };
    }) : data;
}

http.interceptors.response.use((res) => {
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

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFireBase) {
            const expiresDate = localStorageService.getTokenExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            const containSlash = /\/$/gi.test(config.url);

            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";

            if (refreshToken && expiresDate < Date.now()) {
                const data = await authService.refresh();

                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }

            const accessToken = localStorageService.getAccesstoken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};
