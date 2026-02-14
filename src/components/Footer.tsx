import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-grid">

                <div>
                    <h4>Về BeautyGlow</h4>
                    <p>
                        Chúng tôi mang đến mỹ phẩm chất lượng cao,
                        an toàn và hiệu quả cho phụ nữ Việt Nam.
                    </p>
                    <div className="social">
                        <span>📘</span>
                        <span>📸</span>
                        <span>🎵</span>
                        <span>▶️</span>
                    </div>
                </div>

                <div>
                    <h4>Chăm Sóc Khách Hàng</h4>
                    <Link to="/policy">Liên hệ</Link>
                    <Link to="/policy">Hướng dẫn mua hàng</Link>
                    <Link to="/policy">Chính sách đổi trả</Link>
                    <Link to="/policy">Câu hỏi thường gặp</Link>
                </div>

                <div>
                    <h4>Chính Sách</h4>
                    <Link to="/policy">Chính sách bảo mật</Link>
                    <Link to="/policy">Điều khoản sử dụng</Link>
                    <Link to="/policy">Chính sách vận chuyển</Link>
                    <Link to="/policy">Chính sách thanh toán</Link>
                </div>

                <div>
                    <h4>Liên Hệ</h4>
                    <p>📍 123 Nguyễn Huệ, Q1, TP.HCM</p>
                    <p>📞 1900 1234</p>
                    <p>✉ info@beautyglow.vn</p>
                    <p>⏰ 8:00 - 22:00</p>
                </div>

            </div>

            <div className="footer-bottom">
                © 2026 BeautyGlow. Tất cả quyền được bảo lưu.
            </div>
        </footer>
    );
};

export default Footer;
