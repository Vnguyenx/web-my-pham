// Sub-components
import CheckoutForm from '../components/Checkout/CheckoutForm';
import CheckoutMethods from '../components/Checkout/CheckoutMethods';
import OrderReview from '../components/Checkout/OrderReview';
import ShippingMethods from "../components/Checkout/ShippingMethods";
import PaymentModal from '../components/Checkout/PaymentModal'; // Component QR mới

import '../styles/checkoutPage.css';
import {useCheckout} from "../hooks/useCheckout";

const CheckoutPage = () => {

    const {
        cartItems, subtotal, shippingFee, totalPrice,
        paymentMethod, setPaymentMethod,
        shippingMethod, setShippingMethod,
        formData, setFormData,
        isModalOpen, setIsModalOpen,
        currentOrderId,
        handlePlaceOrder, executeSubmit
    } = useCheckout();

    return (
        <div className="checkout-wrapper">
            <div className="checkout-content">
                {/* Bên trái: Thông tin & Phương thức */}
                <div className="checkout-left">
                    <CheckoutForm
                        formData={formData}
                        setFormData={setFormData}
                    />

                    <ShippingMethods
                        selectedMethod={shippingMethod}
                        onChange={setShippingMethod}
                    />

                    <CheckoutMethods
                        method={paymentMethod}
                        setMethod={setPaymentMethod}
                    />
                </div>

                {/* Bên phải: Tổng kết đơn hàng */}
                <div className="checkout-right">
                    <OrderReview
                        items={cartItems}
                        subtotal={subtotal}
                        shippingFee={shippingFee}
                        onPlaceOrder={handlePlaceOrder}
                    />
                </div>
            </div>

            {/* Modal thanh toán QR (Chỉ hiện khi chọn BANKING) */}
            {isModalOpen && (
                <PaymentModal
                    totalAmount={totalPrice}
                    orderId={currentOrderId}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={() => {
                        setIsModalOpen(false);
                        executeSubmit(currentOrderId); // Sau khi khách xác nhận đã chuyển mới lưu đơn
                    }}
                />
            )}
        </div>
    );
};

export default CheckoutPage;