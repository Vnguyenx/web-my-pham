import React from 'react';
import { ShippingMethod } from '../../types/Order';
import '../../styles/ShippingMethods.css';

interface Props {
    selectedMethod: ShippingMethod;
    onChange: (method: ShippingMethod) => void;
}

const ShippingMethods = ({ selectedMethod, onChange }: Props) => {
    return (
        <div className="shipping-methods-section">
            <h3>Phương Thức Vận Chuyển</h3>
            <div className="methods-list">
                <label className={`method-item ${selectedMethod === 'STANDARD' ? 'active' : ''}`}>
                    <input
                        type="radio"
                        name="shipping"
                        checked={selectedMethod === 'STANDARD'}
                        onChange={() => onChange('STANDARD')}
                    />
                    <div className="method-info">
                        <span>🚚 Tiêu chuẩn (5-6 ngày)</span>
                        <strong>₫30.000</strong>
                    </div>
                </label>

                <label className={`method-item ${selectedMethod === 'FAST' ? 'active' : ''}`}>
                    <input
                        type="radio"
                        name="shipping"
                        checked={selectedMethod === 'FAST'}
                        onChange={() => onChange('FAST')}
                    />
                    <div className="method-info">
                        <span>🚀 Giao hàng nhanh (3-5 ngày)</span>
                        <strong>₫50.000</strong>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default ShippingMethods;