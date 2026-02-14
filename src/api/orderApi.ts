import { Order } from "../types/Order";

import { BASE_URL } from "./apiConfig";

/**
 * Lấy toàn bộ đơn hàng
 */
export const getOrders = async (): Promise<Order[]> => {
    const res = await fetch(`${BASE_URL}/orders`);

    if (!res.ok) {
        throw new Error("Không thể lấy danh sách đơn hàng");
    }

    return res.json();
};

/**
 * Lấy đơn hàng theo userId
 */
export const getOrdersByUserId = async (

    userId: number

): Promise<Order[]> => {

    const orders = await getOrders();

    return orders.filter(order => order.userId === userId);

};

/**
 * Lấy chi tiết 1 đơn hàng theo ID product
 */
export const getOrderById = async (id: string): Promise<Order | null> => {
    const res = await fetch(`${BASE_URL}/orders/${id}`);

    if (!res.ok) {
        // Nếu không tìm thấy hoặc lỗi, trả về null để component xử lý
        return null;
    }

    return res.json();
};


/**
 * Lưu đơn hàng mới lên Server
 * @param orderData Đối tượng đơn hàng hoàn chỉnh
 */
export const createOrder = async (orderData: Order): Promise<Order> => {
    const res = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    });

    if (!res.ok) {
        // Có thể quăng lỗi để phía Component bắt được (catch)
        throw new Error("Không thể đặt hàng. Vui lòng thử lại sau!");
    }

    return res.json();
};