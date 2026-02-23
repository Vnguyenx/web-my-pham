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
    const [active, setActive] = useState("contact"); // Để mặc định là liên hệ cho đầy đủ

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

/* ===== CONTENT CHI TIẾT ===== */

const renderContent = (key: string) => {
    switch (key) {
        case "contact":
            return (
                <>
                    <h2>Liên hệ với BeautyGlow</h2>
                    <p>
                        Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn.
                        Đừng ngần ngại kết nối với BeautyGlow qua các kênh sau:
                    </p>

                    <h4>📍 Địa chỉ cửa hàng</h4>
                    <p>Số 123 Đường Mỹ Phẩm, Phường Xuân Thủy, Quận Cầu Giấy, Hà Nội.</p>

                    <h4>📞 Hotline hỗ trợ</h4>
                    <p>1900 67xx (Hỗ trợ từ 8:00 - 22:00 tất cả các ngày trong tuần).</p>

                    <h4>✉️ Email chăm sóc khách hàng</h4>
                    <p>hotro@beautyglow.com.vn</p>

                    <h4>🌐 Mạng xã hội</h4>
                    <p>Facebook: fb.com/beautyglow.official | Instagram: @beautyglow_vn</p>
                </>
            );

        case "guide":
            return (
                <>
                    <h2>Hướng dẫn mua hàng</h2>
                    <p>
                        BeautyGlow mang đến trải nghiệm mua sắm mỹ phẩm trực tuyến
                        an toàn, tiện lợi và nhanh chóng qua các bước đơn giản:
                    </p>

                    <h4>1. Tìm kiếm và Chọn sản phẩm</h4>
                    <p>
                        Quý khách có thể tìm kiếm sản phẩm theo danh mục hoặc sử dụng
                        thanh tìm kiếm. Nhấn vào hình ảnh để xem chi tiết về công dụng và thành phần.
                    </p>

                    <h4>2. Thêm vào giỏ hàng</h4>
                    <p>
                        Sau khi chọn được sản phẩm ưng ý và số lượng phù hợp, nhấn “Thêm vào giỏ hàng”.
                        Bạn có thể tiếp tục chọn thêm các sản phẩm khác hoặc tiến hành kiểm tra giỏ hàng.
                    </p>

                    <h4>3. Nhập thông tin và Thanh toán</h4>
                    <p>
                        Quý khách điền đầy đủ thông tin nhận hàng gồm họ tên,
                        số điện thoại, email và địa chỉ chính xác. Chọn phương thức vận chuyển và thanh toán phù hợp.
                    </p>

                    <p className="note">
                        💡 Nếu quý khách chưa có tài khoản, hệ thống sẽ yêu cầu
                        nhập thêm mật khẩu để tạo tài khoản mới nhằm thuận tiện
                        theo dõi đơn hàng và nhận ưu đãi đặc quyền cho thành viên.
                    </p>
                </>
            );

        case "return":
            return (
                <>
                    <h2>Chính sách đổi trả</h2>
                    <p>
                        BeautyGlow cam kết bảo vệ quyền lợi khách hàng với chính sách đổi trả minh bạch:
                    </p>

                    <h4>1. Thời gian áp dụng</h4>
                    <p>Quý khách được hỗ trợ đổi trả sản phẩm trong vòng 7 ngày kể từ khi nhận hàng thành công.</p>

                    <h4>2. Điều kiện đổi trả</h4>
                    <p>
                        - Sản phẩm bị lỗi từ nhà sản xuất hoặc hư hỏng do vận chuyển.<br />
                        - Sản phẩm giao sai mẫu mã, chủng loại so với đơn đặt hàng.<br />
                        - Sản phẩm phải còn nguyên tem mác, chưa qua sử dụng và có hóa đơn mua hàng.
                    </p>

                    <h4>3. Quy trình thực hiện</h4>
                    <p>Liên hệ Hotline hoặc Inbox Fanpage để được nhân viên hướng dẫn gửi hàng về trung tâm bảo hành.</p>
                </>
            );

        case "faq":
            return (
                <>
                    <h2>Câu hỏi thường gặp (FAQ)</h2>

                    <h4>Q: Sản phẩm tại BeautyGlow có thực sự chính hãng?</h4>
                    <p>A: BeautyGlow cam kết 100% sản phẩm là hàng chính hãng, có đầy đủ hóa đơn chứng từ và tem phụ tiếng Việt.</p>

                    <h4>Q: Tôi đặt hàng thì bao lâu sẽ nhận được hàng?</h4>
                    <p>A: Khu vực nội thành nhận hàng trong 24h. Các khu vực khác từ 2-4 ngày tùy vào đơn vị vận chuyển.</p>

                    <h4>Q: Tôi có thể hủy đơn hàng sau khi đã đặt không?</h4>
                    <p>A: Quý khách có thể hủy đơn hàng trong vòng 30 phút kể từ khi đặt hàng trên website hoặc gọi hotline để hỗ trợ nhanh nhất.</p>
                </>
            );

        case "privacy":
            return (
                <>
                    <h2>Chính sách bảo mật</h2>
                    <p>
                        BeautyGlow cam kết bảo mật tuyệt đối mọi thông tin cá nhân của khách hàng:
                    </p>

                    <h4>1. Thu thập thông tin</h4>
                    <p>Chúng tôi chỉ thu thập các thông tin cần thiết như Tên, SĐT, Địa chỉ để phục vụ việc giao hàng và chăm sóc khách hàng.</p>

                    <h4>2. Sử dụng thông tin</h4>
                    <p>Thông tin của bạn giúp chúng tôi xử lý đơn hàng, gửi thông tin khuyến mãi (nếu bạn đăng ký) và cải thiện chất lượng dịch vụ website.</p>

                    <h4>3. Cam kết</h4>
                    <p>Tuyệt đối không bán, chia sẻ hay trao đổi thông tin cá nhân của khách hàng cho bất kỳ bên thứ ba nào khác ngoài đơn vị vận chuyển.</p>
                </>
            );

        case "shipping":
            return (
                <>
                    <h2>Chính sách vận chuyển</h2>
                    <p>Chúng tôi luôn nỗ lực để sản phẩm đến tay bạn một cách nhanh chóng và an toàn nhất.</p>

                    <h4>1. Phí vận chuyển</h4>
                    <p>
                        - Miễn phí vận chuyển cho đơn hàng từ 700.000đ trở lên.<br />
                        - Đơn hàng dưới 700.000đ áp dụng phí ship đồng giá 30.000đ toàn quốc.
                    </p>

                    <h4>2. Đơn vị vận chuyển</h4>
                    <p>Hợp tác cùng các đối uy tín: Giao Hàng Tiết Kiệm (GHTK), GHN và Viettel Post.</p>

                    <h4>3. Kiểm tra hàng</h4>
                    <p>Quý khách được quyền mở gói hàng kiểm tra ngoại quan sản phẩm trước khi thanh toán cho nhân viên giao hàng.</p>
                </>
            );

        case "payment":
            return (
                <>
                    <h2>Chính sách thanh toán</h2>
                    <p>Để thuận tiện cho việc mua sắm, BeautyGlow hỗ trợ đa dạng các hình thức thanh toán:</p>

                    <h4>1. Thanh toán khi nhận hàng (COD)</h4>
                    <p>Quý khách thanh toán bằng tiền mặt trực tiếp cho nhân viên giao hàng sau khi nhận và kiểm tra hàng thành công.</p>

                    <h4>2. Chuyển khoản ngân hàng (Banking)</h4>
                    <p>Quý khách có thể quét mã QR hoặc chuyển khoản qua số tài khoản được hiển thị tại trang thanh toán.</p>

                    <h4>3. Thanh toán qua ví điện tử</h4>
                    <p>Hỗ trợ thanh toán nhanh qua MoMo, ZaloPay và VNPay với nhiều chương trình hoàn tiền hấp dẫn.</p>
                </>
            );

        case "terms":
            return (
                <>
                    <h2>Điều khoản sử dụng</h2>
                    <p>Chào mừng bạn đến với BeautyGlow. Khi sử dụng website này, bạn mặc nhiên đồng ý với các điều khoản sau:</p>

                    <h4>1. Tài khoản người dùng</h4>
                    <p>Quý khách có trách nhiệm bảo mật mật khẩu tài khoản cá nhân để tránh các trường hợp đặt hàng ngoài ý muốn.</p>

                    <h4>2. Thông tin sản phẩm</h4>
                    <p>Chúng tôi cam kết cung cấp thông tin hình ảnh và giá cả chính xác nhất. Tuy nhiên, nếu có sai sót về giá hiển thị, chúng tôi sẽ liên hệ để xác nhận lại đơn hàng.</p>

                    <h4>3. Quyền sở hữu trí tuệ</h4>
                    <p>Tất cả nội dung, hình ảnh trên website đều thuộc bản quyền của BeautyGlow. Mọi hành vi sao chép trái phép đều vi phạm pháp luật.</p>
                </>
            );

        default:
            return <p>Vui lòng chọn nội dung từ menu bên trái.</p>;
    }
};