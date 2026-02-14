import "../../styles/profileSidebar.css";

interface Props {
    activeTab: string;
    onChangeTab: (tab: string) => void;
}

const ProfileSidebar = ({ activeTab, onChangeTab }: Props) => {
    const menuItems = [
        { id: "info", icon: "👤", text: "Thông tin tài khoản" },
        { id: "orders", icon: "📦", text: "Đơn hàng của tôi" },
        { id: "favorite", icon: "❤️", text: "Sản phẩm yêu thích" },
        { id: "logout", icon: "🚪", text: "Đăng xuất" },
    ];

    return (
        <div className="profile-sidebar">
            <ul>
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className={activeTab === item.id ? "active" : ""}
                        onClick={() => onChangeTab(item.id)}
                    >
                        <span className="icon">{item.icon}</span>
                        <span className="text">{item.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfileSidebar;