import { Comment } from "../types/Comment";

import { BASE_URL } from "./apiConfig";

export const getComments = async (): Promise<Comment[]> => {
    const res = await fetch(`${BASE_URL}/comments`);
    return res.json();
};
