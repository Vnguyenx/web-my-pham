// src/components/ProductCard.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/Product";
import Rating from "./RatingStars";

// Hooks & Redux
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import {
    addToWishlistAsync,
    removeFromWishlistAsync
} from "../features/wishlist/wishlistSlice";
import {
    selectIsInWishlist,
    selectWishlistItemByProductId
} from "../features/wishlist/wishlistSelectors";

// Styles
import "../styles/rating.css";
import "../styles/productCard.css";

interface Props {
    product: Product;
    commentCount?: number;
}

const ProductCard = ({ product, commentCount = 0 }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // 1. Sử dụng Custom Hooks mới tách
    const { isLoggedIn, user, requireAuth } = useAuth();
    const { addToCart } = useCart();

    // 2. Logic Yêu thích (Wishlist) lấy từ Redux
    const isInWishlist = useAppSelector((state) => selectIsInWishlist(state, product.id));
    const wishlistItem = useAppSelector((state) => selectWishlistItemByProductId(state, product.id));

    // 3. State nội bộ xử lý UI
    const [showLoginMessage, setShowLoginMessage] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    /* =============================================
       XỬ LÝ YÊU THÍCH (WISHLIST)
    ============================================= */
    const handleWishlistToggle = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan ra thẻ cha (thẻ card)

        if (!isLoggedIn) {
            setShowLoginMessage(true);
            setTimeout(() => setShowLoginMessage(false), 3000);
            return;
        }

        if (!user?.id || isProcessing) return;

        setIsProcessing(true);
        try {
            if (isInWishlist && wishlistItem) {
                // TRƯỜNG HỢP: BỎ YÊU THÍCH
                await dispatch(removeFromWishlistAsync({
                    id: wishlistItem.id,
                    productId: product.id
                })).unwrap();
            } else {
                // TRƯỜNG HỢP: THÊM YÊU THÍCH
                await dispatch(addToWishlistAsync({
                    userId: user.id,
                    productId: product.id
                })).unwrap();
            }
        } catch (error: any) {
            console.error('Wishlist error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    /* =============================================
       XỬ LÝ THÊM VÀO GIỎ HÀNG (CART)
    ============================================= */
    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Sử dụng requireAuth từ hook: Nếu chưa login sẽ đá sang trang Login
        // Nếu đã login sẽ thực hiện hàm callback bên trong
        requireAuth(() => {
            addToCart(product, 1);
        });
    };

    return (
        <div className="product-card">
            {/* Badge giảm giá */}
            {product.discountPercent > 0 && (
                <div className="badge-sale">-{product.discountPercent}%</div>
            )}

            {/* NÚT TRÁI TIM */}
            <button
                className={`btn-wishlist ${isInWishlist ? 'active' : ''} ${isProcessing ? 'processing' : ''}`}
                onClick={handleWishlistToggle}
                disabled={isProcessing}
            >
                {isProcessing ? (
                    <div className="spinner-mini"></div>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={isInWishlist ? "#ff4d4f" : "none"}
                        stroke={isInWishlist ? "#ff4d4f" : "currentColor"}
                        strokeWidth="2"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                )}
            </button>

            {/* Thông báo yêu cầu login nhanh */}
            {showLoginMessage && (
                <div className="login-message">Vui lòng đăng nhập</div>
            )}

            {/* Hình ảnh sản phẩm */}
            <div className="product-image-wrapper" onClick={() => navigate(`/products/${product.id}`)}>
                <img src={product.image} alt={product.name} />
            </div>

            {/* Nội dung thông tin sản phẩm */}
            <div className="product-info">
                <p className="brand">{product.brand}</p>
                <h4 className="name" onClick={() => navigate(`/products/${product.id}`)}>
                    {product.name}
                </h4>

                <Rating rating={product.rating}/>

                <div className="price">
                    <span className="price-sale">{product.price.toLocaleString()}đ</span>
                    {product.priceRoot > product.price && (
                        <span className="price-root">{product.priceRoot.toLocaleString()}đ</span>
                    )}
                </div>

                <div className="meta">
                    <span>Đã bán {product.sold}</span>
                </div>

                {/* Nút thêm vào giỏ hàng */}
                <button
                    className={`add-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    {product.stock === 0 ? "Hết hàng" : "Thêm giỏ hàng"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;