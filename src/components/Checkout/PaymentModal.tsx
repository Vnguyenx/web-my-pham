import React from 'react';
import '../../styles/PaymentModal.css';

interface Props {
    totalAmount: number;
    orderId: string;
    onConfirm: () => void; // Chạy khi khách nhấn "Đã chuyển tiền"
    onClose: () => void;   // Chạy khi khách nhấn "Đóng"
}

const PaymentModal = ({ totalAmount, orderId, onConfirm, onClose }: Props) => {
    // API tạo mã QR giả lập từ VietQR
    const qrUrl = `https://img.vietqr.io/image/bidv-6150729528-compact2.jpg?amount=${totalAmount}&addInfo=${orderId}`;

    return (
        <div className="payment-modal-overlay">
            <div className="payment-modal-content">
                <button className="close-btn" onClick={onClose}>✕</button>
                <h3>Thanh toán qua QR Ngân hàng</h3>

                <div className="qr-container">
                    <img src={qrUrl} alt="Mã QR thanh toán" />
                    <p>Vui lòng quét mã để thanh toán <strong>{totalAmount.toLocaleString()}₫</strong></p>
                </div>

                <div className="payment-guide">
                    <p>Nội dung chuyển khoản: <strong>{orderId}</strong></p>
                </div>

                <button className="confirm-btn" onClick={onConfirm}>
                    Tôi đã chuyển khoản thành công
                </button>
            </div>
        </div>
    );
};

export default PaymentModal;