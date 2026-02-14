import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../api/userApi";
import { updateUserSuccess } from "../features/auth/authSlice";
import { User } from "../types/User";


export const useProfile = (user: User) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: user.name,
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
        gender: user.gender || "Nữ",
        birthday: user.birthday || "",
    });

    const [avatarPreview, setAvatarPreview] = useState<string>(
        user.avatar || "https://i.pravatar.cc/150"
    );

    const handleAvatarChange = (file: File | undefined) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const updateProfile = async (finalAddress: string) => {
        setLoading(true);
        try {
            const updatedUser: User = {
                ...user,
                ...form,
                address: finalAddress, // Ưu tiên địa chỉ từ logic 3 cấp
                avatar: avatarPreview,
            };

            const res = await updateUser(user.id, updatedUser);
            dispatch(updateUserSuccess(res));
            alert("Cập nhật thông tin thành công");
        } catch (err) {
            alert("Cập nhật thất bại");
        } finally {
            setLoading(false);
        }
    };

    return {
        form, setForm,
        avatarPreview, handleAvatarChange,
        loading, updateProfile
    };
};