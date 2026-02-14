import { CartItem, cartService } from "../../services/cartService";
import "../../styles/cartItem.css";

interface Props {
    item: CartItem;
    onUpdate: () => void;
}

const CartItemRow = ({ item, onUpdate }: Props) => {
    const handleQty = (delta: number) => {
        const newQty = item.quantity + delta;
        // item.stock đã có sẵn trong object item lưu ở localStorage
        cartService.updateQuantity(item.id, newQty, item.stock);
        onUpdate(); // Load lại trang giỏ hàng
    };

    return (
        <tr>
            <td className="product-cell">
                <img src={item.image} alt={item.name}/>
                <div>
                    <p>{item.name}</p>
                </div>
            </td>
            <td>₫{item.price.toLocaleString()}</td>
            <td>
                <div className="qty-actions">
                    <button onClick={() => handleQty(-1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    {/* Vô hiệu hóa nút cộng nếu đã chạm trần tồn kho */}
                    <button onClick={() => handleQty(1)} disabled={item.quantity >= item.stock}>+</button>
                </div>
                {item.quantity >= item.stock && <small style={{color: 'red'}}>Đã đạt giới hạn kho</small>}
            </td>
            <td className="total-cell">₫{(item.price * item.quantity).toLocaleString()}</td>
            <td>
                <button className="btn-delete" onClick={() => {
                    cartService.removeFromCart(item.id);
                    onUpdate();
                }}>🗑️
                </button>
            </td>
        </tr>
    );
};
export default CartItemRow;