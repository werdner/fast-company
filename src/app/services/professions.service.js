import { httpService } from "./http.service";

const professionEndpoint = "profession/";

export const professionService = {
    get: async () => {
        const { data } = await httpService.get(professionEndpoint);
        return data;
    }
};
