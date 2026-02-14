import { Order } from "../../types/Order";
import "../../styles/ordercard.css";
import { useNavigate } from "react-router-dom";

interface Props {
    order: Order;

}
const DEFAULT_IMAGE = "https://i.ibb.co/yFZBzCGX/D-ng-th-Vichy-4.jpg";


const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
        case "pending":
            return "Chờ xác nhận";
        case "confirmed":
            return "Đã xác nhận";
        case "shipping":
            return "Đang giao";
        case "delivered":
            return "Hoàn thành";
        case "cancelled":
            return "Đã huỷ";
        default:
            return status;
    }
};

const OrderCard = ({ order }: Props) => {

    const navigate = useNavigate();

    const handleGoToDetail = () => {
        navigate(`/profile/orders/${order.id}`);
    };

    return (
        <div className="order-card">
            {/* HEADER */}
            <div className="order-header">
                <strong>#{order.id}</strong>
                <p className="order-date">
                    Ngày mua:{" "}
                    {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                </p>
                <span className={`status ${order.status}`}>
                    {getStatusLabel(order.status)}
                </span>
            </div>

            {/* ITEMS */}
            {order.items.map(item => (
                <div className="order-item" key={item.productId}>
                    <div className="order-item-content">
                        {/* THÊM ẢNH Ở ĐÂY */}
                        <img
                            src={item.img || DEFAULT_IMAGE}
                            alt={item.name}
                            className="order-item-img"
                            onError={(e) => {
                                // Xử lý nếu link ảnh thật bị lỗi load
                                (e.currentTarget as HTMLImageElement).src = DEFAULT_IMAGE;
                            }}
                        />
                        <div className="order-item-info">
                            <strong>{item.name}</strong>
                            <p>Số lượng: {item.quantity}</p>
                        </div>
                    </div>

                    <span className="order-item-price">
                        {item.price.toLocaleString()}đ
                    </span>
                </div>
            ))}

            {/* FOOTER */}
            <div className="order-footer">
                <strong>
                    Tổng tiền:{" "}
                    {order.totalPrice.toLocaleString()}đ
                </strong>

                <button className="detail-btn" onClick={handleGoToDetail}>
                    Xem chi tiết
                </button>
            </div>
        </div>
    );
};

export default OrderCard;
