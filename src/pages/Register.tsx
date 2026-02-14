import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { registerUser } from "../api/authApi";
import type { RegisterUser } from "../types/User";
import { loginSuccess } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";

import "../styles/register.css";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    /* =======================
       STATE FORM ĐĂNG KÝ
       (KHÔNG có id)
    ======================= */
    const [form, setForm] = useState<RegisterUser>({
        username: "",
        password: "",
        name: "",
        email: "",

    });

    /* =======================
       STATE NHẬP LẠI MẬT KHẨU
    ======================= */
    const [confirmPassword, setConfirmPassword] = useState("");

    /* =======================
       STATE HIỂN / ẨN MẬT KHẨU
    ======================= */
    const [showPassword, setShowPassword] = useState(false);

    /* =======================
       STATE THÔNG BÁO LỖI
    ======================= */
    const [error, setError] = useState("");

    /* =======================
       HANDLE SUBMIT FORM
    ======================= */
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // 🔒 Kiểm tra mật khẩu và nhập lại mật khẩu
        if (form.password !== confirmPassword) {
            setError("Mật khẩu và nhập lại mật khẩu không khớp");
            return;
        }

        try {
            // 1️⃣ Gọi API đăng ký
            const user = await registerUser(form);

            // 2️⃣ AUTO LOGIN → LƯU USER VÀO REDUX
            dispatch(loginSuccess(user));

            // 3️⃣ Điều hướng về trang chủ
            navigate("/");

        } catch (err: any) {
            setError(err.message || "Đăng ký thất bại, vui lòng thử lại");
        }
    };

    return (
        <div className="auth-wrapper">

            {/* 🔙 QUAY LẠI TRANG CHỦ */}
            <div className="back-home" onClick={() => navigate("/")}>
                ← Quay lại trang chủ
            </div>

            <form onSubmit={submit} className="auth-container">
                <h2>Xin chào người mới</h2>

                {/* HIỂN THỊ LỖI */}
                {error && <p className="error">{error}</p>}

                {/* HỌ TÊN */}
                <input
                    placeholder="Họ tên"
                    value={form.name}
                    onChange={e =>
                        setForm({ ...form, name: e.target.value })
                    }
                    required
                />

                {/* USERNAME */}
                <input
                    placeholder="Tên đăng nhập"
                    value={form.username}
                    onChange={e =>
                        setForm({ ...form, username: e.target.value })
                    }
                    required
                />

                {/* EMAIL */}
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={e =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                {/* MẬT KHẨU */}
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu"
                        value={form.password}
                        onChange={e =>
                            setForm({ ...form, password: e.target.value })
                        }
                        required
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                </div>

                {/* NHẬP LẠI MẬT KHẨU */}
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                </div>

                {/* NÚT ĐĂNG KÝ */}
                <button type="submit">Đăng ký</button>

                {/* CHUYỂN SANG LOGIN */}
                <p className="switch-auth">
                    Đã có tài khoản?{" "}
                    <Link to="/login">Đăng nhập</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
