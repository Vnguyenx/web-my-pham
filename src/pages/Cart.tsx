// src/pages/Cart.tsx
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

// Import các sub-components
import CartList from '../components/Cart/CartList';
import CartSummary from '../components/Cart/CartSummary';

import "../styles/cartPage.css";

const CartPage = () => {
    // 1. Sử dụng hook tập trung để quản lý quyền truy cập
    const { isLoggedIn } = useAuth();

    // 2. Sử dụng hook tập trung để quản lý logic giỏ hàng
    const {
        cartItems,
        refreshCart,
        subtotal,
    } = useCart();

    // 3. Tự động tải dữ liệu khi vào trang
    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    // Tính phí vận chuyển dựa trên giỏ hàng (giữ nguyên logic cũ của bạn)
    const shippingFee = cartItems.length > 0 ? 30000 : 0;

    // Nếu chưa login, ProtectedRoute sẽ chặn ở tầng Route,
    // nhưng check ở đây giúp UI an toàn hơn trong lúc redirect.
    if (!isLoggedIn) return null;

    return (
        <div className="cart-page-container">
            <h1 className="page-heading">GIỎ HÀNG CỦA BẠN</h1>

            <div className="cart-layout-grid">
                {/* Phần danh sách sản phẩm (Bên trái) */}
                <div className="cart-left-section">
                    {cartItems.length > 0 ? (
                        <CartList
                            items={cartItems}
                            // Lưu ý: CartList của bạn cần nhận onUpdate để refresh lại data
                            onUpdate={refreshCart}
                            // Bạn có thể truyền thêm onRemove và onUpdateQty nếu CartList có hỗ trợ
                        />
                    ) : (
                        <div className="empty-cart-message" style={{ textAlign: 'center', padding: '40px' }}>
                            <p>Giỏ hàng của bạn đang trống.</p>
                        </div>
                    )}
                </div>

                {/* Phần tóm tắt thanh toán (Bên phải) */}
                <div className="cart-right-section">
                    <CartSummary
                        subtotal={subtotal}
                        shipping={shippingFee}
                    />
                </div>
            </div>
        </div>
    );
};

export default CartPage;