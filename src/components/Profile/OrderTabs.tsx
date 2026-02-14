import "../../styles/ordertabs.css";

interface Props {
    activeTab: string;
    onChange: (tab: string) => void;
}

const tabs = [
    { key: "all", label: "Tất cả" },
    { key: "pending", label: "Chờ xác nhận" },
    { key: "confirmed", label: "Đã xác nhận" },
    { key: "shipping", label: "Đang giao" },
    { key: "delivered", label: "Hoàn thành" },
    { key: "cancelled", label: "Đã huỷ" },
];

const OrderTabs = ({ activeTab, onChange }: Props) => {
    return (
        <div className="order-tabs">
            {tabs.map(tab => (
                <button
                    key={tab.key}
                    className={activeTab === tab.key ? "active" : ""}
                    onClick={() => onChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default OrderTabs;
