// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isLoggedIn } = useAuth();

    // Nếu chưa đăng nhập, chuyển hướng về trang login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;