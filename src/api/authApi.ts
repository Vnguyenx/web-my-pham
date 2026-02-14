import { User, RegisterUser } from "../types/User";
import { BASE_URL } from "./apiConfig";



/* =======================
   LẤY DANH SÁCH USER
======================= */
export const getUsers = async (): Promise<User[]> => {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error("Không thể lấy danh sách user");
    return res.json();
};

/* =======================
   LOGIN
======================= */
export const loginUser = async (
    username: string,
    password: string
): Promise<User> => {
    const users = await getUsers();

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        throw new Error("Sai tài khoản hoặc mật khẩu");
    }

    return user;
};

/* =======================
   REGISTER
======================= */
export const registerUser = async (
    user: RegisterUser
): Promise<User> => {
    const users = await getUsers();

    const exists = users.some(
        u =>
            u.username === user.username ||
            (user.email && u.email === user.email)
    );

    if (exists) {
        throw new Error("Username hoặc Email đã tồn tại");
    }

    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...user,
            avatar:
                user.avatar ||
                `https://i.pravatar.cc/150?u=${Date.now()}`,
            role: "user",
            createdAt: new Date().toISOString(),
        }),
    });

    if (!res.ok) {
        throw new Error("Đăng ký thất bại");
    }

    return res.json();
};
