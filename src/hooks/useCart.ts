// src/hooks/useCart.ts
import { useState, useCallback } from 'react';
import { cartService, CartItem } from '../services/cartService';
import { Product } from '../types/Product';

export const useCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load dữ liệu giỏ hàng
    const refreshCart = useCallback(() => {
        const data = cartService.getCart();
        setCartItems(data);
    }, []);

    // Thêm sản phẩm vào giỏ
    const addToCart = (product: Product, quantity: number = 1) => {
        cartService.addToCart(product, quantity);
        alert(`Đã thêm ${product.name} vào giỏ hàng`);
        refreshCart(); // Cập nhật lại state local sau khi thêm
    };


    return {
        cartItems,
        refreshCart,
        addToCart,
        // Tính tổng tiền nhanh
        subtotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
};