// src/components/Profile/ProfileWishlist.tsx
import { useAppSelector } from "../../app/hooks";
import WishlistItem from "./WishlistItem";
import "../../styles/profileWishlist.css";
import { usePagination} from "../../hooks/usePagination_Reverse"
import {useNavigate} from "react-router-dom";


const ProfileWishlist = () => {

    const navigate = useNavigate();
    // 1. Lấy dữ liệu từ Redux Store
    const { items, loading } = useAppSelector((state) => state.wishlist);

    // 2. Sử dụng Hook phân trang (Gọn gàng hơn rất nhiều)
    // - reverse: true -> Tự động đưa sản phẩm vừa thích lên đầu danh sách
    // - useUrlParams: false -> Để việc chuyển trang không làm thay đổi URL trang Profile
    const {
        currentItems,
        totalPages,
        currentPage,
        handlePageChange,
        totalItems
    } = usePagination({
        data: items,        // Truyền mảng gốc vào, không cần .reverse() thủ công
        itemsPerPage: 4,
        useUrlParams: false,
        reverse: true
    });

    // 3. Trạng thái đang tải
    if (loading && items.length === 0) {
        return <div className="wishlist-loading">Đang tải danh sách yêu thích...</div>;
    }

    // 4. Trạng thái danh sách trống
    if (items.length === 0) {
        return (
            <div className="wishlist-empty">
                <div className="empty-content">
                    <span className="empty-icon">💔</span>
                    <p>Danh sách yêu thích của bạn đang trống.</p>
                    <button className="btn-explore" onClick={() => navigate('/products')}>
                        Khám phá sản phẩm ngay
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="wishlist-container">
            {/* Header */}
            <div className="wishlist-header">
                {/* Sử dụng độ dài từ items gốc */}
                <h3>Sản phẩm đã thích ({totalItems})</h3>
                <span className="page-info">
                    Trang {currentPage} / {totalPages}
                </span>
            </div>

            {/* List items hiển thị sản phẩm đã đảo ngược */}
            <div className="wishlist-list">
                {currentItems.map((item) => (
                    <WishlistItem key={item.id} item={item} />
                ))}
            </div>

            {/* Pagination giữ nguyên logic cũ */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ← Trước
                    </button>

                    <div className="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Sau →
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileWishlist;