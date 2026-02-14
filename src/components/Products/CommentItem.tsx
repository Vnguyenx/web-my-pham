import { useEffect, useState } from "react";
import { Comment } from "../../types/Comment";
import { User } from "../../types/User";
import { getUserById } from "../../api/userApi";
import RatingStars from "../RatingStars";
import "../../styles/commentItem.css"; // Đảm bảo bạn tạo file CSS này

interface Props {
    comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
    // 1. Khởi tạo state để lưu thông tin User
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // 2. useEffect để fetch thông tin User mỗi khi Comment được hiển thị
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                // Gọi hàm từ userApi bạn đã viết
                const userData = await getUserById(comment.userId);
                setUser(userData);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin user:", error);
            } finally {
                setLoading(false);
            }
        };

        if (comment.userId) {
            fetchUserData();
        }
    }, [comment.userId]);

    return (
        <div className="comment-item">
            {/* Cột trái: Ảnh đại diện (Avatar) */}
            <div className="comment-avatar">
                {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="avatar-img" />
                ) : (
                    // Nếu chưa load xong hoặc không có ảnh, hiện chữ cái đầu của tên hoặc ID
                    <div className="avatar-placeholder">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                )}
            </div>

            {/* Cột phải: Nội dung bình luận */}
            <div className="comment-body">
                <div className="comment-header">
                    <span className="user-name">
                        {loading ? "Đang tải..." : (user?.name || `Người dùng #${comment.userId}`)}
                    </span>
                    <span className="comment-date">
                        {/* Định dạng lại ngày nếu cần, ở đây dùng trực tiếp từ API */}
                        {comment.date}
                    </span>
                </div>

                {/* Phần đánh giá sao - Bắt buộc hiển thị theo logic của bạn */}
                <div className="comment-rating">
                    <RatingStars rating={comment.rating} />
                </div>

                {/* Nội dung text của bình luận */}
                <p className="comment-content">
                    {comment.content}
                </p>
            </div>
        </div>
    );
};

export default CommentItem;