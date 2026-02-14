// src/components/Products/ProductInfo.tsx
import { useState } from "react";
import { Product } from "../../types/Product";
import RatingStars from "../RatingStars";

// Hooks & Redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import {
    addToWishlistAsync,
    removeFromWishlistAsync
} from "../../features/wishlist/wishlistSlice";
import {
    selectIsInWishlist,
    selectWishlistItemByProductId
} from "../../features/wishlist/wishlistSelectors";

// Styles
import "../../styles/productInfo.css";

interface Props { product: Product; }

const ProductInfo = ({ product }: Props) => {
    const dispatch = useAppDispatch();

    // 1. Sử dụng Custom Hooks mới tách
    const { isLoggedIn, user, requireAuth } = useAuth();
    const { addToCart } = useCart();

    // 2. State & Redux selectors
    const isInWishlist = useAppSelector((state) => selectIsInWishlist(state, product.id));
    const wishlistItem = useAppSelector((state) => selectWishlistItemByProductId(state, product.id));

    const [showLoginMessage, setShowLoginMessage] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [quantity, setQuantity] = useState<number>(1);

    /* =============================================
       XỬ LÝ YÊU THÍCH (WISHLIST)
    ============================================= */
    const handleWishlistToggle = async () => {
        if (!isLoggedIn) {
            setShowLoginMessage(true);
            setTimeout(() => setShowLoginMessage(false), 3000);
            return;
        }

        if (!user?.id || isProcessing) return;
        setIsProcessing(true);

        try {
            if (isInWishlist && wishlistItem) {
                await dispatch(removeFromWishlistAsync({
                    id: wishlistItem.id,
                    productId: product.id
                })).unwrap();
            } else {
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
       XỬ LÝ SỐ LƯỢNG (QUANTITY)
    ============================================= */
    const handleIncrease = () => quantity < product.stock && setQuantity(prev => prev + 1);
    const handleDecrease = () => quantity > 1 && setQuantity(prev => prev - 1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) setQuantity(1);
        else if (value > product.stock) setQuantity(product.stock);
        else setQuantity(value);
    };

    /* =============================================
       XỬ LÝ THÊM VÀO GIỎ HÀNG (CART)
    ============================================= */
    const handleAddToCart = () => {
        // Sử dụng requireAuth từ hook để bảo vệ hành động mua hàng
        requireAuth(() => {
            addToCart(product, quantity);
        });
    };

    return (
        <div className="product-info-container">
            {/* PHẦN TRÁI: GALLERY ẢNH */}
            <div className="product-gallery">
                <div className="main-image">
                    <img src={product.image} alt={product.name} />
                </div>
            </div>

            {/* PHẦN PHẢI: CHI TIẾT SẢN PHẨM */}
            <div className="product-main-details">
                <p className="product-brand">{product.brand}</p>

                <div className="title-wishlist-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h1 className="product-title">{product.name}</h1>

                    {/* NÚT YÊU THÍCH */}
                    <div className="wishlist-wrapper" style={{ position: 'relative' }}>
                        <button
                            className={`btn-wishlist-detail ${isInWishlist ? 'active' : ''}`}
                            onClick={handleWishlistToggle}
                            disabled={isProcessing}
                            title={isInWishlist ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
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
                                    width="28"
                                    height="28"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            )}
                        </button>
                        {showLoginMessage && (
                            <div className="login-message-tooltip">Vui lòng đăng nhập</div>
                        )}
                    </div>
                </div>

                <div className="product-meta-row">
                    <RatingStars rating={product.rating} />
                    <span className="sold-count">| Đã bán {product.sold}</span>
                </div>

                <div className="product-price-block">
                    <span className="current-price">{product.price.toLocaleString()}đ</span>
                    {product.discountPercent > 0 && (
                        <>
                            <span className="old-price">{product.priceRoot.toLocaleString()}đ</span>
                            <span className="discount-tag">-{product.discountPercent}%</span>
                        </>
                    )}
                </div>

                <div className="product-description-brief">
                    <h4>Mô tả sản phẩm:</h4>
                    <p>{product.descriptionDetail || "Đang cập nhật..."}</p>
                    <h4 style={{ marginTop: '15px' }}>Công dụng chính:</h4>
                    <ul className="benefits-list">
                        {(product.benefits || []).length > 0 ? (
                            product.benefits?.map((item, index) => (
                                <li key={index}>✨ {item}</li>
                            ))
                        ) : (
                            <li>Đang cập nhật công dụng...</li>
                        )}
                    </ul>
                </div>

                {/* KHU VỰC MUA HÀNG */}
                <div className="purchase-actions">
                    <div className="quantity-selector-wrapper">
                        <label>Số lượng:</label>
                        <div className="quantity-selector">
                            <button
                                onClick={handleDecrease}
                                disabled={quantity <= 1 || product.stock === 0}
                            >-</button>
                            <input
                                type="number"
                                value={product.stock === 0 ? 0 : quantity}
                                onChange={handleInputChange}
                                min="1"
                                max={product.stock}
                                disabled={product.stock === 0}
                            />
                            <button
                                onClick={handleIncrease}
                                disabled={quantity >= product.stock || product.stock === 0}
                            >+</button>
                        </div>

                        <div className="button-group">
                            <button
                                className="btn-add-cart"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                            >
                                {product.stock === 0 ? "Hết hàng" : "Thêm Vào Giỏ"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;