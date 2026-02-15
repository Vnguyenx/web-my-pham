// src/components/Products/ProductReviews.tsx
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllComments } from "../../features/comment/commentSlice";
import CommentItem from "./CommentItem";
import ReviewForm from "./ReviewForm";
import "../../styles/productReviews.css";
import {usePagination} from "../../hooks/usePagination_Reverse";

interface Props { productId: number; }

const ProductReviews = ({ productId }: Props) => {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state) => state.comments);

    // 1. Tải danh sách bình luận khi component mount
    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchAllComments());
        }
    }, [dispatch, items.length]);

    // 2. Lọc bình luận theo ID sản phẩm (Mảng thô, chưa cần sắp xếp)
    const productCommentsRaw = useMemo(() => {
        return items.filter((c) => c.productId === productId);
    }, [items, productId]);


    // 3. Sử dụng Hook phân trang vạn năng
    // - reverse: true -> Tự động đưa đánh giá mới nhất lên đầu
    // - useUrlParams: false -> Tránh nhảy trang review làm đổi URL trang chi tiết
    const {
        currentItems: currentComments,
        totalPages,
        currentPage,
        handlePageChange,
        totalItems
    } = usePagination({
        data: productCommentsRaw,
        itemsPerPage: 3, // Hiển thị 3 bình luận mỗi trang
        useUrlParams: false,
        reverse: false
    });

    if (loading && items.length === 0) return <div className="loading">Đang tải...</div>;

    return (
        <div className="product-reviews-section">
            {/* PHẦN FORM NHẬP */}
            <ReviewForm productId={productId} />
            <hr className="divider" />

            {/* DANH SÁCH ĐÁNH GIÁ */}
            <div className="reviews-list-container">
                <h3>Đánh giá từ khách hàng ({totalItems})</h3>

                {totalItems > 0 ? (
                    <>
                        <div className="comment-list">
                            {currentComments.map((comment) => (
                                <CommentItem key={comment.id} comment={comment} />
                            ))}
                        </div>

                        {/* Pagination UI */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >←</button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <button
                                        key={p}
                                        className={p === currentPage ? "active" : ""}
                                        onClick={() => handlePageChange(p)}
                                    >{p}</button>
                                ))}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >→</button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="no-comments">Chưa có đánh giá nào cho sản phẩm này.</p>
                )}
            </div>
        </div>
    );
};

export default ProductReviews;