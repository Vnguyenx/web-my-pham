import { useState } from "react";
import "../styles/policy.css";

const MENU = {
    support: {
        title: "Chăm Sóc Khách Hàng",
        items: [
            { key: "contact", label: "Liên hệ" },
            { key: "guide", label: "Hướng dẫn mua hàng" },
            { key: "return", label: "Chính sách đổi trả" },
            { key: "faq", label: "Câu hỏi thường gặp" },
        ],
    },
    policy: {
        title: "Chính Sách",
        items: [
            { key: "privacy", label: "Chính sách bảo mật" },
            { key: "shipping", label: "Chính sách vận chuyển" },
            { key: "payment", label: "Chính sách thanh toán" },
            { key: "terms", label: "Điều khoản sử dụng" },
        ],
    },
};

const Policy = () => {
    const [openMenu, setOpenMenu] = useState<"support" | "policy">("support");
    const [active, setActive] = useState("guide");

    return (
        <div className="policy-layout">
            {/* SIDEBAR */}
            <aside className="policy-sidebar">
                {Object.entries(MENU).map(([key, menu]) => (
                    <div key={key}>
                        <h4 onClick={() => setOpenMenu(key as any)}>
                            {menu.title}
                        </h4>

                        {openMenu === key &&
                            menu.items.map(item => (
                                <div
                                    key={item.key}
                                    className={`policy-item ${active === item.key ? "active" : ""}`}
                                    onClick={() => setActive(item.key)}
                                >
                                    {item.label}
                                </div>
                            ))}
                    </div>
                ))}
            </aside>

            {/* CONTENT */}
            <section className="policy-content">
                {renderContent(active)}
            </section>
        </div>
    );
};

export default Policy;

/* ===== CONTENT ===== */

const renderContent = (key: string) => {
    switch (key) {
        case "guide":
            return (
                <>
                    <h2>Hướng dẫn mua hàng</h2>
                    <p>
                        BeautyGlow mang đến trải nghiệm mua sắm mỹ phẩm trực tuyến
                        an toàn, tiện lợi và nhanh chóng.
                    </p>

                    <h4>1. Chọn sản phẩm</h4>
                    <p>
                        Quý khách có thể tìm kiếm sản phẩm theo danh mục hoặc sử dụng
                        thanh tìm kiếm trên website.
                    </p>

                    <h4>2. Thêm vào giỏ hàng</h4>
                    <p>
                        Sau khi chọn sản phẩm phù hợp, nhấn “Thêm vào giỏ hàng”.
                    </p>

                    <h4>3. Thanh toán</h4>
                    <p>
                        Quý khách điền đầy đủ thông tin nhận hàng gồm họ tên,
                        số điện thoại, email và địa chỉ giao hàng.
                    </p>

                    <p className="note">
                        💡 Nếu quý khách chưa có tài khoản, hệ thống sẽ yêu cầu
                        nhập thêm mật khẩu để tạo tài khoản mới nhằm thuận tiện
                        theo dõi đơn hàng và nhận ưu đãi trong tương lai.
                    </p>
                </>
            );

        case "privacy":
            return (
                <>
                    <h2>Chính sách bảo mật</h2>
                    <p>
                        BeautyGlow cam kết bảo mật tuyệt đối mọi thông tin cá nhân
                        của khách hàng.
                    </p>
                    <p>
                        Thông tin chỉ được sử dụng cho mục đích xử lý đơn hàng,
                        chăm sóc khách hàng và nâng cao trải nghiệm dịch vụ.
                    </p>
                </>
            );

        case "return":
            return (
                <>
                    <h2>Chính sách đổi trả</h2>
                    <p>
                        Sản phẩm được hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày nhận hàng
                        nếu phát sinh lỗi từ nhà sản xuất.
                    </p>
                </>
            );

        case "faq":
            return (
                <>
                    <h2>Câu hỏi thường gặp</h2>
                    <p>
                        Q: Sản phẩm có chính hãng không?<br />
                        A: BeautyGlow cam kết 100% sản phẩm chính hãng.
                    </p>
                </>
            );

        default:
            return <p>Vui lòng chọn nội dung</p>;
    }
};
