export interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    phone?: string;
    address?: string;
    email?: string;
    avatar?: string;
    birthday?: string;
    role?: "user";
    gender?: "Nam" | "Nữ" | "Khác";
    createdAt: string;
}

/* User khi đăng ký (chưa có id, createdAt) */
export type RegisterUser = Omit<User, "id" | "createdAt">;
