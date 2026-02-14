// src/pages/Login.tsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { loginSuccess } from "../features/auth/authSlice";
import { fetchWishlist } from "../features/wishlist/wishlistSlice";
import { useAppDispatch } from "../app/hooks"; // THAY ĐỔI: Dùng typed hook
import "../styles/login.css";

const Login = () => {
    // THAY ĐỔI: Dùng useAppDispatch thay vì useDispatch<AppDispatch>
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // THÊM: Loading state

    /**
     * Xử lý đăng nhập
     * 1. Gọi API login
     * 2. Dispatch loginSuccess (lưu user vào Redux + localStorage)
     * 3. Load wishlist của user
     * 4. Chuyển hướng về trang chủ
     */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true); // Bắt đầu loading

        try {
            // Bước 1: Gọi API login
            const user = await loginUser(username, password);

            // Bước 2: Lưu user vào Redux và localStorage
            dispatch(loginSuccess(user));

            // Bước 3: Load wishlist của user
            await dispatch(fetchWishlist(user.id)).unwrap();

            // Bước 4: Chuyển hướng về trang chủ
            navigate("/");

        } catch (err: any) {
            // Xử lý lỗi
            console.error('Login error:', err);
            setError(err.message || "Đăng nhập thất bại");

        } finally {
            // Tắt loading dù thành công hay thất bại
            setIsLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            {/* 🔙 Quay về home */}
            <div className="back-home" onClick={() => navigate("/")}>
                ← Quay lại trang chủ
            </div>

            <form className="login-form" onSubmit={handleLogin}>
                <h2>Welcome back</h2>

                {/* Hiển thị error nếu có */}
                {error && <p className="error">{error}</p>}

                <input
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    disabled={isLoading} // THÊM: Disable khi đang loading
                    required // THÊM: Validation
                />

                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={isLoading} // THÊM: Disable khi đang loading
                    required // THÊM: Validation
                />

                <button
                    type="submit"
                    disabled={isLoading} // THÊM: Disable khi đang loading
                >
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>

                {/* 🔁 CHUYỂN SANG REGISTER */}
                <p className="switch-auth">
                    Chưa có tài khoản?{" "}
                    <Link to="/register">Đăng ký ngay</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;