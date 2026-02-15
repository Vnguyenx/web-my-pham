import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../features/categories/categorySlice";
import type { Category } from "../types/Category";
import { useNavigate } from "react-router-dom";
import { cartService } from "../services/cartService";
import { useAuth } from "../hooks/useAuth";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import { useSearchPreview } from "../hooks/useSearchPreview";


const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [showPreview, setShowPreview] = useState(false);

    // 1. Sử dụng useAuth để lấy thông tin đăng nhập
    const { user, isLoggedIn, requireAuth } = useAuth();

    // 2. Lấy categories từ Redux
    const categories = useAppSelector((state) => state.categories.list);

    const [cartCount, setCartCount] = useState(0);

    // Fetch categories khi component mount
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length]);

    // --- LOGIC GIỎ HÀNG ---
    const updateCount = () => {
        const cart = cartService.getCart();
        const total = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(total);
    };

    useEffect(() => {
        updateCount();
        window.addEventListener("cartUpdate", updateCount);
        return () => window.removeEventListener("cartUpdate", updateCount);
    }, []);

    // --- XỬ LÝ TÌM KIẾM ---
    const { results, isLoading } = useSearchPreview(searchTerm);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const val = searchTerm.trim();
            setShowPreview(false); // Đóng preview khi nhấn Enter
            navigate(val ? `/products?q=${encodeURIComponent(val)}` : `/products`);
        }
    };

    // --- BẢO VỆ ĐƯỜNG DẪN GIỎ HÀNG ---
    const handleCartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // Nếu chưa login thì requireAuth sẽ tự đá sang trang login
        requireAuth(() => {
            navigate("/cart");
        });
    };

    return (
        <header className="header">
            {/* ===== TOP ===== */}
            <div className="header-top">
                <div className="logo">
                    <Link to="/">BG</Link>
                </div>

                <div className="search-wrapper" onMouseLeave={() => setShowPreview(false)}>
                    <input
                        className="search"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowPreview(true);
                        }}
                        onFocus={() => setShowPreview(true)}
                        onKeyDown={handleSearch}
                    />
                    {showPreview && (searchTerm.length >= 2) && (
                        <div className="search-preview-dropdown">
                            {isLoading && <div className="preview-item">Đang tìm...</div>}

                            {!isLoading && results.length > 0 ? (
                                results.map((product) => (
                                    <div
                                        key={product.id}
                                        className="preview-item"
                                        onClick={() => {
                                            navigate(`/products/${product.id}`);
                                            setShowPreview(false);
                                            setSearchTerm("");
                                        }}
                                    >
                                        <div className="preview-info">
                                            <p className="preview-name">{product.name}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                !isLoading && <div className="preview-item">Không tìm thấy sản phẩm</div>
                            )}
                        </div>
                    )}
                </div>

                <div className="actions">
                    <a href="/cart" onClick={handleCartClick} className="cart-icon-wrapper">
                        🛒
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </a>

                    {isLoggedIn && user ? (
                        <Link to="/profile" className="user-profile">
                            <img
                                src={user.avatar || "https://i.pravatar.cc/40"}
                                className="avatar"
                                alt="User"
                            />
                        </Link>
                    ) : (
                        <Link to="/login" className="login-link" title="Đăng nhập">
                            👤
                        </Link>
                    )}
                </div>
            </div>

            {/* ===== NAV ===== */}
            <div className="nav-container">
                <nav className="nav">
                    {categories.map((cat: Category) => (
                        <div className="nav-item" key={cat.id}>
                            <Link
                                to={`/products?category=${cat.id}`}
                            >
                                {cat.name}
                            </Link>

                            {cat.subs &&
                                cat.subs.length > 0 && (
                                    <div className="dropdown">
                                        {cat.subs.map(
                                            (sub, index) => (
                                                <Link
                                                    key={index}
                                                    to={`/products?category=${cat.id}&sub=${sub}`}
                                                >
                                                    {sub}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                )}
                        </div>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
