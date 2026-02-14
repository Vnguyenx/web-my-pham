import { useNavigate } from "react-router-dom";
import "../../styles/cartSummary.css";


interface Props {
    subtotal: number;
    shipping: number;
}



const CartSummary = ({ subtotal, shipping }: Props) => {
    const navigate = useNavigate();


    const handleCheckout = () => {
        // Chuyển hướng sang trang checkout
        navigate("/checkout");
    };


    return (
        <div className="cart-summary">
            <h3>Tóm Tắt Đơn Hàng</h3>
            <div className="summary-line">
                <span>Tạm tính:</span>
                <span>₫{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-line">
                <span>Phí vận chuyển:</span>

                <span className="shipping-note">Tính toán tại bước thanh toán</span>
            </div>
            <div className="promo-code">
                <input placeholder="Nhập mã giảm giá"/>
                <button>Áp dụng</button>
            </div>
            <hr/>
            <div className="summary-total">
                <span>Tổng cộng (tạm tính):</span>
                <span className="price-final">₫{(subtotal + shipping).toLocaleString()}</span>
            </div>
            <button className="btn-checkout" onClick={handleCheckout}>Tiến Hành Thanh Toán</button>
            <button className="btn-continue" onClick={() => navigate('/products')}>← Tiếp tục mua hàng</button>
        </div>
    );
};
export default CartSummary;