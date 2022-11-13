import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import { httpService } from "../services/http.service";

export const useMockData = () => {
    const statusConsts = {
        idle: "NotStarted",
        pending: "In Process",
        sucsess: "Ready",
        error: "Error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount = professions.length + users.length + qualities.length;

    const incrementCount = () => setCount(prevState => prevState + 1);
    const updateProgress = () => {
        const newProgress = Math.floor((count / summuryCount) * 100);

        switch (true) {
        case count !== 0 && status === statusConsts.idle:
            setStatus(statusConsts.pending);
            break;
        case newProgress === 100:
            setStatus(statusConsts.sucsess);
            break;
        }

        if (progress < newProgress) setProgress(() => newProgress);
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const profession of professions) {
                await httpService.put("profession/" + profession._id, profession);
                incrementCount();
            }
            for (const user of users) {
                await httpService.put("user/" + user._id, user);
                incrementCount();
            }
            for (const quality of qualities) {
                await httpService.put("quality/" + quality._id, quality);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    }

    return { error, progress, status, initialize };
};
