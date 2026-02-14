import { User } from "../types/User";

import { BASE_URL } from "./apiConfig";

/**
 * Lấy tất cả danh sách người dùng
 * (Hữu ích khi muốn map tên/avatar cho toàn bộ danh sách comment)
 */
export const getUsers = async (): Promise<User[]> => {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) {
        throw new Error("Không thể tải danh sách người dùng");
    }
    return res.json();
};

/**
 * Lấy thông tin user cụ thể theo id
 * (Sử dụng trong CommentItem để hiện name và avt)
 */
export const getUserById = async (id: number): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/${id}`);

    if (!res.ok) {
        throw new Error("Không thể lấy thông tin user");
    }

    return res.json();
};

/* ======================
   UPDATE USER (Dùng PATCH để cập nhật từng phần)
====================== */
export const updateUser = async (
    id: number,
    data: Partial<User>
): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Cập nhật user thất bại");
    }

    return res.json();
};

/**
 * Export object để sử dụng gọn hơn: userApi.getUserById(id)
 */
export const userApi = {
    getUsers,
    getUserById,
    updateUser,
};