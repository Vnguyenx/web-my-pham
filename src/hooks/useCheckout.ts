// src/hooks/useCheckout.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { cartService, CartItem } from '../services/cartService';
import { Order, PayInfo, ShippingMethod } from '../types/Order';
import { createOrder } from "../api/orderApi";
import {productApi} from "../api/productApi";

export const useCheckout = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAppSelector((state) => state.auth);

    // --- QUẢN LÝ STATE ---
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<"COD" | "BANKING">("COD");
    const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("STANDARD");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState("");

    const [formData, setFormData] = useState<PayInfo>({
        name: user?.name || '',
        phone: '',
        address: '',
        email: user?.email || '',
        paymentMethod: "COD",
        shippingMethod: "STANDARD"
    });

    // Cập nhật lại form nếu user từ Redux thay đổi (đề phòng tải chậm)
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',    // Đảm bảo không truyền undefined
                email: user.email ?? ''    // Sử dụng chuỗi rỗng nếu email là undefined/null
            }));
        }
    }, [user]);

    // Kiểm tra giỏ hàng trống
    useEffect(() => {
        const items = cartService.getCart();
        if (items.length === 0) {
            navigate("/cart");
            return;
        }
        setCartItems(items);
    }, [isLoggedIn, navigate]);

    // --- LOGIC TÍNH TOÁN ---
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const FREE_SHIP_THRESHOLD = 700000;
    const isEligibleForFreeShip = subtotal >= FREE_SHIP_THRESHOLD;

    const shippingFee = (shippingMethod === "FAST")
        ? 50000
        : (isEligibleForFreeShip ? 0 : 30000);

    const totalPrice = subtotal + shippingFee;

    // --- XỬ LÝ ĐƠN HÀNG ---
    const executeSubmit = async (orderId: string) => {
        const finalOrder: Order = {
            id: orderId,
            userId: user!.id,
            items: cartItems.map(item => ({
                productId: item.id,
                img: item.image,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            paymentInfo: {
                ...formData,
                paymentMethod,
                shippingMethod,
                address: formData.address
            },
            totalPrice: totalPrice,
            status: "pending",
            orderDate: new Date().toISOString()
        };

        try {
            await createOrder(finalOrder);
            const stockUpdatePromises = cartItems.map(item => {
                const newStock = item.stock - item.quantity;
                return productApi.updateProductStock(item.id, newStock);
            });
            await Promise.all(stockUpdatePromises);
            alert("Chúc mừng! Đơn hàng của bạn đã được đặt thành công.");
            cartService.clearCart();
            navigate("/profile");
        } catch (error: any) {
            alert(error.message || "Lỗi kết nối Server.");
        }
    };

    const handlePlaceOrder = async () => {
        if (!formData.name || !formData.phone || !formData.address) {
            alert("Vui lòng điền đầy đủ thông tin giao hàng!");
            return;
        }

        const newOrderId = `ORD-${Date.now()}`;
        setCurrentOrderId(newOrderId);

        if (paymentMethod === "BANKING") {
            setIsModalOpen(true);
        } else {
            await executeSubmit(newOrderId);
        }
    };

    return {
        cartItems, subtotal, shippingFee, totalPrice,
        paymentMethod, setPaymentMethod,
        shippingMethod, setShippingMethod,
        formData, setFormData,
        isModalOpen, setIsModalOpen,
        currentOrderId,
        handlePlaceOrder, executeSubmit
    };
};