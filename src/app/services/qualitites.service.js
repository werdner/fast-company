import { httpService } from "./http.service";

const qualityEndpoint = "quality/";

export const qualityService = {
    get: async () => {
        const { data } = await httpService.get(qualityEndpoint);
        return data;
    }
};
