import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Order } from "../types/Order";
import { getOrderById } from "../api/orderApi";
import "../styles/orderDetail.css";

/**
 * Component hiển thị chi tiết đơn hàng
 * - Lấy đơn hàng từ API dựa vào ID trong URL
 * - Hiển thị đầy đủ thông tin: sản phẩm, thanh toán, vận chuyển, trạng thái
 */
const OrderDetail = () => {
    // === HOOKS ===
    const { id } = useParams<{ id: string }>(); // Lấy ID đơn hàng từ URL
    const navigate = useNavigate(); // Hook để điều hướng

    // === STATE ===
    const [order, setOrder] = useState<Order | null>(null); // Lưu thông tin đơn hàng
    const [loading, setLoading] = useState(true); // Trạng thái đang tải

    // === HELPER FUNCTIONS ===

    /**
     * Chuyển đổi trạng thái đơn hàng sang tiếng Việt
     * @param status - Trạng thái đơn hàng (pending, confirmed, shipping, delivered, cancelled)
     * @returns Tên trạng thái bằng tiếng Việt
     */
    const getStatusLabel = (status: Order["status"]): string => {
        switch (status) {
            case "pending":
                return "Chờ xác nhận";
            case "confirmed":
                return "Đã xác nhận";
            case "shipping":
                return "Đang giao";
            case "delivered":
                return "Hoàn thành";
            case "cancelled":
                return "Đã hủy";
            default:
                return status;
        }
    };

    /**
     * Chuyển đổi phương thức thanh toán sang tiếng Việt
     * @param method - Phương thức thanh toán (COD hoặc BANKING)
     * @returns Tên phương thức bằng tiếng Việt
     */
    const getPaymentMethodLabel = (method: "COD" | "BANKING"): string => {
        switch (method) {
            case "COD":
                return "Thanh toán khi nhận hàng (COD)";
            case "BANKING":
                return "Chuyển khoản ngân hàng";
            default:
                return method;
        }
    };

    /**
     * Chuyển đổi phương thức vận chuyển sang tiếng Việt
     * @param method - Phương thức vận chuyển (STANDARD hoặc FAST)
     * @returns Tên phương thức bằng tiếng Việt với thời gian dự kiến
     */
    const getShippingMethodLabel = (method: "STANDARD" | "FAST"): string => {
        switch (method) {
            case "STANDARD":
                return "Tiêu chuẩn (5-6 ngày)";
            case "FAST":
                return "Giao nhanh (3-5 ngày)";
            default:
                return method;
        }
    };

    // === EFFECTS ===

    /**
     * Effect: Tải thông tin đơn hàng khi component mount hoặc ID thay đổi
     */
    useEffect(() => {
        if (id) {
            getOrderById(id)
                .then((data) => setOrder(data))
                .catch((err) => {
                    console.error("Lỗi lấy chi tiết đơn hàng:", err);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    // === RENDER CONDITIONS ===

    // Hiển thị loading khi đang tải dữ liệu
    if (loading) {
        return (
            <div className="order-detail-container">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    // Hiển thị lỗi khi không tìm thấy đơn hàng
    if (!order) {
        return (
            <div className="order-detail-container">
                <div className="error-state">
                    <h3>⚠️ Không tìm thấy đơn hàng!</h3>
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        ← Quay lại
                    </button>
                </div>
            </div>
        );
    }

    // === MAIN RENDER ===
    return (
        <div className="order-detail-container">
            {/* Nút quay lại */}
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Quay lại
            </button>

            {/* Card chứa toàn bộ thông tin đơn hàng */}
            <div className="detail-card">

                {/* === HEADER: Mã đơn hàng + Trạng thái === */}
                <div className="detail-header">
                    <h2>Chi tiết đơn hàng #{order.id}</h2>
                    <span className={`status-badge ${order.status}`}>
                        {getStatusLabel(order.status)}
                    </span>
                </div>

                {/* === SECTION 1: Thông tin khách hàng === */}
                <div className="info-section customer-info">
                    <h4>📋 Thông tin khách hàng</h4>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">Người nhận:</span>
                            <span className="value">{order.paymentInfo.name}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Số điện thoại:</span>
                            <span className="value">{order.paymentInfo.phone}</span>
                        </div>
                        <div className="info-item full-width">
                            <span className="label">Địa chỉ:</span>
                            <span className="value">{order.paymentInfo.address}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Email:</span>
                            <span className="value">{order.paymentInfo.email || "Không có"}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Ngày đặt:</span>
                            <span className="value">
                                {new Date(order.orderDate).toLocaleString("vi-VN", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* === SECTION 2: Phương thức thanh toán & vận chuyển === */}
                <div className="info-section payment-shipping-info">
                    <h4>💳 Thanh toán & Vận chuyển</h4>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">Thanh toán:</span>
                            <span className="value payment-method">
                                {getPaymentMethodLabel(order.paymentInfo.paymentMethod)}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="label">Vận chuyển:</span>
                            <span className="value shipping-method">
                                {getShippingMethodLabel(order.paymentInfo.shippingMethod)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* === SECTION 3: Danh sách sản phẩm === */}
                <div className="items-section">
                    <h4>🛍️ Danh sách sản phẩm</h4>

                    {/* Table cho desktop */}
                    <div className="table-wrapper">
                        <table className="order-table">
                            <thead>
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>SL</th>
                                <th>Thành tiền</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order.items.map((item, index) => (
                                <tr key={`${item.productId}-${index}`}>
                                    <td data-label="Hình ảnh">
                                        <img
                                            src={item.img || "https://via.placeholder.com/60"}
                                            alt={item.name}
                                            className="item-thumb"
                                            onError={(e) => {
                                                // Fallback nếu ảnh lỗi
                                                e.currentTarget.src = "https://via.placeholder.com/60";
                                            }}
                                        />
                                    </td>
                                    <td data-label="Sản phẩm" className="product-name">
                                        {item.name}
                                    </td>
                                    <td data-label="Giá" className="price">
                                        {item.price.toLocaleString()}₫
                                    </td>
                                    <td data-label="SL" className="quantity">
                                        x{item.quantity}
                                    </td>
                                    <td data-label="Thành tiền" className="subtotal">
                                        {(item.price * item.quantity).toLocaleString()}₫
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* === FOOTER: Tổng tiền === */}
                <div className="detail-footer">
                    <div className="total-row">
                        <span className="total-label">Tổng cộng:</span>
                        <span className="total-value">{order.totalPrice.toLocaleString()}₫</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;