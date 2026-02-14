// src/pages/Profile.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import {clearWishlistState} from "../features/wishlist/wishlistSlice"; // THÊM MỚI
import { useAppDispatch, useAppSelector } from "../app/hooks"; //
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileOrders from "../components/Profile/ProfileOrders";
import { cartService } from "../services/cartService";
import "../styles/profile.css";
import ProfileWishlist from "../components/Profile/ProfileWishlist";

const Profile = () => {
    // THAY ĐỔI: Dùng useAppDispatch và useAppSelector thay vì useDispatch và useSelector
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    const [activeTab, setActiveTab] = useState("info");
    const navigate = useNavigate();

    // Trường hợp chưa login
    if (!user) {
        return (
            <div className="profile-page">
                <div className="profile-content" style={{ gridColumn: "1 / -1" }}>
                    <div className="empty-state">
                        <div className="icon">🔒</div>
                        <h3>Bạn chưa đăng nhập</h3>
                        <p>Vui lòng đăng nhập để xem thông tin tài khoản</p>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Xử lý logout
     * 1. Xóa wishlist trên server (nếu có userId)
     * 2. Logout user (xóa auth state)
     * 3. Reset activeTab
     * 4. Chuyển hướng về trang chủ
     */
    const handleLogout = () => {
        // CHỈ clear Redux state, KHÔNG xóa trên server
        dispatch(clearWishlistState());

        cartService.clearCart();

        // Logout user
        dispatch(logout());

        // Reset tab và chuyển hướng
        setActiveTab("info");
        navigate("/");
    };

    // Render nội dung theo tab
    const renderContent = () => {
        switch (activeTab) {
            case "info":
                return <ProfileInfo user={user} />;

            case "orders":
                return (
                    <div>
                        <ProfileOrders userId={user.id} />
                    </div>
                );

            case "favorite":
                        return <ProfileWishlist />;
            case "logout":
                return (
                    <div>
                        <h2>🚪 Đăng xuất</h2>
                        <div style={{ padding: "20px", textAlign: "center" }}>
                            <p style={{ marginBottom: "20px", color: "#666" }}>
                                Bạn có chắc chắn muốn đăng xuất?
                            </p>
                            <button
                                style={{
                                    background: "#dc3545",
                                    color: "#fff",
                                    border: "none",
                                    padding: "12px 32px",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                }}
                                onClick={handleLogout}
                            >
                                Xác nhận đăng xuất
                            </button>
                        </div>
                    </div>
                );

            default:
                return <h2>Tab không tồn tại</h2>;
        }
    };

    return (
        <div className="profile-page">
            {/* SIDEBAR với Card Grid Layout */}
            <ProfileSidebar activeTab={activeTab} onChangeTab={setActiveTab} />

            {/* CONTENT AREA */}
            <div className="profile-content">{renderContent()}</div>
        </div>
    );
};

export default Profile;