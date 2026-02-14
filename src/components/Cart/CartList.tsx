import CartItemRow from "./cartItem";
import { CartItem } from "../../services/cartService";
import "../../styles/cartList.css";

interface Props {
    items: CartItem[];
    onUpdate: () => void;
}

const CartList = ({ items, onUpdate }: Props) => {
    return (
        <div className="cart-items">
            <table className="cart-table">
                <thead>
                <tr>
                    <th>SẢN PHẨM</th>
                    <th>ĐƠN GIÁ</th>
                    <th>SỐ LƯỢNG</th>
                    <th>THÀNH TIỀN</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <CartItemRow key={item.id} item={item} onUpdate={onUpdate} />
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default CartList;