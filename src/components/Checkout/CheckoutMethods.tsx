import React from 'react';
import '../../styles/CheckoutMethod.css';

interface Props {
    method: string;
    setMethod: (m: "COD" | "BANKING") => void;
}

const CheckoutMethods = ({ method, setMethod }: Props) => {
    return (
        <div className="checkout-methods">
            <h3>Phương Thức Thanh Toán</h3>
            <label className={`method-item ${method === 'COD' ? 'active' : ''}`}>
                <input type="radio" name="payment" checked={method === 'COD'} onChange={() => setMethod('COD')} />
                💵 Thanh toán khi nhận hàng (COD)
            </label>
            <label className={`method-item ${method === 'BANKING' ? 'active' : ''}`}>
                <input type="radio" name="payment" checked={method === 'BANKING'} onChange={() => setMethod('BANKING')} />
                🏦 Chuyển khoản ngân hàng
            </label>
        </div>
    );
};
export default CheckoutMethods;