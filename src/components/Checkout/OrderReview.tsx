import React from 'react';
import { CartItem } from '../../services/cartService';
import '../../styles/OrderReview.css';

interface Props {
    items: CartItem[];
    subtotal: number;
    shippingFee: number;
    onPlaceOrder: () => void; // Hàm xử lý khi nhấn Đặt hàng
}

const OrderReview = ({ items, subtotal, shippingFee, onPlaceOrder }: Props) => {
    return (
        <div className="order-review-card">
            <h3>Đơn Hàng Của Bạn</h3>

            {/* Danh sách sản phẩm rút gọn */}
            <div className="order-items-mini">
                {items.map((item) => (
                    <div key={item.id} className="item-row">
                        <div className="item-info">
                            <img src={item.image} alt={item.name} />
                            <div>
                                <p className="name">{item.name}</p>
                                <span className="qty">Số lượng: {item.quantity}</span>
                            </div>
                        </div>
                        <span className="price">
                            ₫{(item.price * item.quantity).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            <hr />

            {/* Tính toán tiền nong */}
            <div className="summary-details">
                <div className="line">
                    <span>Tạm tính:</span>
                    <span>₫{subtotal.toLocaleString()}</span>
                </div>
                <div className="line">
                    <span>Phí vận chuyển:</span>
                    <span>₫{shippingFee.toLocaleString()}</span>
                </div>
                <div className="line discount">
                    <span>Giảm giá:</span>
                    <span>-₫0</span>
                </div>
            </div>

            <div className="total-line">
                <span>Tổng cộng:</span>
                <span className="final-total">
                    ₫{(subtotal + shippingFee).toLocaleString()}
                </span>
            </div>

            {/* Nút quan trọng nhất */}
            <button className="btn-submit-order" onClick={onPlaceOrder}>
                ĐẶT HÀNG
            </button>

            <p className="security-note">🔒 Thanh toán bảo mật | ✅ Đảm bảo hoàn tiền</p>
        </div>
    );
};

export default OrderReview;