import { Product } from "../types/Product";

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
export interface CartItem extends Product {
    quantity: number;
}

const CART_KEY = "beauty_glow_cart";

export const cartService = {
    // Lấy danh sách giỏ hàng từ LocalStorage
    getCart: (): CartItem[] => {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    },

    // Lưu giỏ hàng
    saveCart: (cart: CartItem[]) => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        // Kích hoạt event để các component khác (như Header) cập nhật kịp thời
        window.dispatchEvent(new Event("cartUpdate"));
    },

    // Thêm sản phẩm
    addToCart: (product: Product, quantity: number = 1) => {
        const cart = cartService.getCart();
        const existingItem = cart.find(item => item.id === product.id);
        const currentStock = product.stock;

        if (existingItem) {
            // Logic cũ: existingItem.quantity += quantity;
            // Logic mới: Kiểm tra tổng sau khi cộng có vượt stock không
            const newQuantity = existingItem.quantity + quantity;

            if (newQuantity > currentStock) {
                existingItem.quantity = currentStock; // Chỉ cho phép lấy tối đa bằng tồn kho
                alert(`Bạn đã có ${existingItem.quantity} sản phẩm trong giỏ. Không thể thêm quá số lượng tồn kho (${currentStock})`);
            } else {
                existingItem.quantity = newQuantity;
            }
        } else {
            // Nếu sản phẩm mới hoàn toàn, kiểm tra xem số lượng thêm có lố stock không
            if (quantity > currentStock) {
                cart.push({...product, quantity: currentStock});
                alert(`Chỉ có thể thêm tối đa ${currentStock} sản phẩm.`);
            } else {
                cart.push({...product, quantity});
            }
        }
        cartService.saveCart(cart);
    },

    // Cập nhật số lượng
    updateQuantity: (productId: number, quantity: number, stock: number) => {
        let cart = cartService.getCart();
        cart = cart.map(item => {
            if (item.id === productId) {
                // Đảm bảo số lượng mới không nhỏ hơn 1 và không lớn hơn stock
                const validatedQty = Math.max(1, Math.min(quantity, stock));
                return {...item, quantity: validatedQty};
            }
            return item;
        });
        cartService.saveCart(cart);
    },

    // Xóa sản phẩm
    removeFromCart: (productId: number) => {
        const cart = cartService.getCart().filter(item => item.id !== productId);
        cartService.saveCart(cart);
    },

    // Hàm xóa sạch giỏ hàng (dùng khi logout)
    clearCart: () => {
        localStorage.removeItem(CART_KEY);
        window.dispatchEvent(new Event("cartUpdate"));
    }
};