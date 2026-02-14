// src/hooks/useAuth.ts
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAppSelector((state) => state.auth);

    // Hàm tiện ích: Nếu chưa login thì đá sang trang login
    const requireAuth = (callback: () => void) => {
        if (!isLoggedIn) {
            navigate("/login");
            return false;
        }
        callback();
        return true;
    };

    return {
        user,
        isLoggedIn,
        requireAuth
    };
};