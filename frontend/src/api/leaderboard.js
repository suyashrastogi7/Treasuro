import { dispatchApi } from "../network/apiClient";
import { API_METHOD } from "./Constants";

export const getLeaderboard = async () => {
    try {
        const { data } = await dispatchApi({
            endPoint: `/api/leaderboard`,
            method: API_METHOD.GET,
        });
        return data;
    } catch (err) {

    }
}