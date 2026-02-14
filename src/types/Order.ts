export type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";
export type PaymentMethod = "COD" | "BANKING";
export type ShippingMethod = "STANDARD" | "FAST";

export interface OrderItem {
    productId: number;
    img: string;      // Lưu ảnh tại thời điểm mua để làm lịch sử
    name: string;
    quantity: number;
    price: number;    // Giá tại thời điểm mua (quan trọng vì giá có thể thay đổi sau này)
}

export interface PayInfo {
    name: string;
    phone: string;
    address: string;
    email: string;
    paymentMethod: PaymentMethod;
    shippingMethod: ShippingMethod;
}

export interface Order {
    id: string;              // VD: ORD-1715832000
    userId: number;

    items: OrderItem[];      // Danh sách sản phẩm đã mua
    paymentInfo: PayInfo;    // Thông tin người nhận và thanh toán

    totalPrice: number;
    status: OrderStatus;
    orderDate: string;       // ISO String: new Date().toISOString()
}