
import { User } from "../../types/User";
import "../../styles/profileInfo.css";
import {useProfile} from "../../hooks/useProfileInfo";
import {useLocation} from "../../hooks/useLocation";

interface Props {
    user: User;
}

const ProfileInfo = ({ user }: Props) => {
    // 1. Hook quản lý Profile chung
    const { form, setForm, avatarPreview, handleAvatarChange, loading, updateProfile } = useProfile(user);

    // 2. Hook quản lý Địa chỉ (Sử dụng chuỗi address hiện tại của user làm mặc định)
    const {
        provinces, districts, wards,
        handleProvinceChange, handleDistrictChange, handleWardChange, handleDetailChange,
    } = useLocation(""); // Để trống detail vì user.address thường là chuỗi đã ghép

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Truyền form.address (địa chỉ đã ghép) vào hàm update
        updateProfile(form.address);
    };

    return (
        <div className="profile-info">
            <h2>Thông tin tài khoản</h2>

            <div className="avatar-section">
                <img src={avatarPreview} alt="avatar" className="profile-avatar" />
                <label className="upload-btn">
                    Đổi ảnh đại diện
                    <input type="file" accept="image/*" hidden
                           onChange={(e) => handleAvatarChange(e.target.files?.[0])} />
                </label>
            </div>

            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                    <input placeholder="Họ tên" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <input placeholder="Số điện thoại" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>

                <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />

                {/* ===== PHẦN ĐỊA CHỈ 3 CẤP (Giống Checkout) ===== */}
                <div className="location-selectors">
                    <select onChange={async (e) => {
                        const addr = await handleProvinceChange(Number(e.target.value), e.target.options[e.target.selectedIndex].text);
                        setForm({...form, address: addr});
                    }}>
                        <option value="">Chọn Tỉnh/Thành</option>
                        {provinces.map((p: any) => <option key={p.code} value={p.code}>{p.name}</option>)}
                    </select>

                    <select disabled={!districts.length} onChange={async (e) => {
                        const addr = await handleDistrictChange(Number(e.target.value), e.target.options[e.target.selectedIndex].text);
                        setForm({...form, address: addr});
                    }}>
                        <option value="">Chọn Quận/Huyện</option>
                        {districts.map((d: any) => <option key={d.code} value={d.code}>{d.name}</option>)}
                    </select>

                    <select disabled={!wards.length} onChange={(e) => {
                        const addr = handleWardChange(e.target.options[e.target.selectedIndex].text);
                        setForm({...form, address: addr});
                    }}>
                        <option value="">Chọn Phường/Xã</option>
                        {wards.map((w: any) => <option key={w.code} value={w.code}>{w.name}</option>)}
                    </select>
                </div>

                <input
                    placeholder="Số nhà, tên đường..."
                    onChange={(e) => {
                        const addr = handleDetailChange(e.target.value);
                        setForm({...form, address: addr});
                    }}
                />

                <p className="address-display"><b>Địa chỉ hiện tại:</b> {form.address || "Chưa cập nhật"}</p>

                <div className="form-row">
                    <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value as any})}>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                    <input type="date" value={form.birthday} onChange={e => setForm({...form, birthday: e.target.value})} />
                </div>

                <button className="btn-save" disabled={loading}>
                    {loading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
            </form>
        </div>
    );
};

export default ProfileInfo;
