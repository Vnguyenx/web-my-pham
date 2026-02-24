import { useMemo, useState } from "react";
import { usePagination } from "../../hooks/usePagination_Reverse";
import OrderTabs from "./OrderTabs";
import OrderCard from "./OrderCard";
import { useAppSelector } from "../../app/hooks";
import {useNavigate} from "react-router-dom";

interface Props {
    userId: number;
}

const ProfileOrders = ({ userId }: Props) => {
    // 1. Lấy dữ liệu từ Redux Store thay vì fetch local
    // 'orders' là tên reducer đã khai báo trong store.ts
    const { items: orders, loading } = useAppSelector((state) => state.orders); //
    const [activeTab, setActiveTab] = useState("all");
    const navigate = useNavigate();

    // 2. Logic Lọc theo Tab (All, Pending, Shipping, v.v.)
    const filteredOrders = useMemo(() => {
        if (activeTab === "all") return orders;
        return orders.filter(order => order.status === activeTab);
    }, [orders, activeTab]); //

    // 3. Sử dụng Hook phân trang vạn năng
    const {
        currentItems,
        totalPages,
        currentPage,
        handlePageChange,
        totalItems
    } = usePagination({
        data: filteredOrders,
        itemsPerPage: 2,
        useUrlParams: false,
        reverse: true
    }); //

    // Giữ nguyên các trạng thái hiển thị UI
    if (loading) return <div className="loading">Đang tải lịch sử đơn hàng...</div>;

    if (orders.length === 0) {
        return (
            <>
                <style>{`
                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 20px;
                    background-color: #FFFFFF;
                    border-radius: 12px;
                    text-align: center;
                }

                .empty-state .icon {
                    font-size: 64px;
                    margin-bottom: 16px;
                }

                .empty-state h3 {
                    font-size: 22px;
                    color: #333333;
                    margin-bottom: 10px;
                    font-weight: 600;
                }

                .empty-state p {
                    font-size: 15px;
                    color: #888888;
                    margin-bottom: 24px;
                }

                .btn-shop-now {
                    background-color: #E67E22;
                    color: #FFFFFF;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 8px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }

                .btn-shop-now:hover {
                    background-color: #A93226;
                }
            `}</style>

                <div className="empty-state">
                    <div className="icon">📦</div>
                    <h3>Bạn chưa có đơn hàng nào</h3>
                    <p>Hãy khám phá các sản phẩm tuyệt vời của chúng tôi nhé!</p>
                    <button className="btn-shop-now" onClick={() => navigate('/products')}>
                        Mua sắm ngay
                    </button>
                </div>
            </>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>📦 Đơn hàng của tôi</h2>
                {totalItems > 0 && (
                    <span className="page-info">
                        Trang {currentPage} / {totalPages} ({filteredOrders.length} đơn hàng)
                    </span>
                )}
            </div>

            <OrderTabs
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            <div className="order-list">
                {currentItems.map(order => (
                    <OrderCard key={order.id} order={order}/>
                ))}
            </div>

            {/* Pagination - Giữ nguyên logic và class UI */}
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

export default ProfileOrders;