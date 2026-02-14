// src/components/Products/ReviewForm.tsx
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { addCommentAsync } from "../../features/comment/commentSlice";
import RatingStars from "../RatingStars";
import "../../styles/reviewsForm.css";

const ReviewForm = ({ productId }: { productId: number }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isLoggedIn, user } = useAppSelector((state) => state.auth);
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoggedIn) {
            navigate("/login"); // Chuyển hướng nếu chưa đăng nhập
            return;
        }

        if (rating === 0) {
            alert("Vui lòng đánh giá số sao!");
            return;
        }

        if (content.trim().length < 10) {
            alert("Nội dung đánh giá phải ít nhất 10 ký tự!");
            return;
        }

        setSubmitting(true);
        try {
            const newComment = {
                productId,
                userId: user?.id || 0,
                rating,
                content,
                date: new Date().toISOString().split('T')[0] // Định dạng YYYY-MM-DD
            };

            await dispatch(addCommentAsync(newComment)).unwrap();

            // Reset form sau khi gửi thành công
            setRating(0);
            setContent("");
            alert("Cảm ơn bạn đã đánh giá sản phẩm!");
        } catch (err) {
            alert("Có lỗi xảy ra: " + err);
        } finally {
            setSubmitting(false);
        }
    };

    // Giao diện khi chưa đăng nhập
    if (!isLoggedIn) {
        return (
            <div className="review-login-prompt">
                <p>Bạn cần <strong>đăng nhập</strong> để viết đánh giá cho sản phẩm này.</p>
                <button
                    className="btn-login-redirect"
                    onClick={() => navigate("/login")}
                >
                    Đăng nhập ngay
                </button>
            </div>
        );
    }

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h4>Viết đánh giá của bạn</h4>

            <div className="form-group">
                <label>Đánh giá của bạn về sản phẩm này:</label>
                {/* Sử dụng RatingStars với prop onSelect mới */}
                <RatingStars
                    rating={rating}
                    onSelect={(val) => setRating(val)}
                />
            </div>

            <div className="form-group">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Sản phẩm dùng tốt không bạn? Chia sẻ cho mọi người cùng biết nhé..."
                    rows={4}
                    disabled={submitting}
                />
            </div>

            <button
                type="submit"
                className="btn-submit-review"
                disabled={submitting}
            >
                {submitting ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
        </form>
    );
};

export default ReviewForm;