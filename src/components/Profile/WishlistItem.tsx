// src/components/Profile/WishlistItem.tsx
import { WishlistItem as WishlistItemType } from "../../types/Wishlist";
import { useAppDispatch } from "../../app/hooks";
import { removeFromWishlistAsync } from "../../features/wishlist/wishlistSlice";
import { Link } from "react-router-dom";
import "../../styles/wishlistItem.css";
import { useCart } from "../../hooks/useCart";

interface Props {
    item: WishlistItemType;
}

const WishlistItem = ({ item }: Props) => {
    const dispatch = useAppDispatch();
    const { product } = item;

    // 1. Lấy hàm addToCart từ Hook dùng chung
    const { addToCart } = useCart();

    // Nếu dữ liệu bị lỗi không có product, trả về null để tránh crash
    if (!product) return null;

    // 2. Xử lý thêm vào giỏ
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        // Số lượng mặc định là 1 khi thêm từ danh sách yêu thích
        addToCart(product, 1);
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault(); // Ngăn chuyển trang khi nhấn nút xóa
        dispatch(removeFromWishlistAsync({
            id: item.id,
            productId: item.productId
        }));
    };

    return (
        <div className="wishlist-item">
            {/* Ảnh sản phẩm */}
            <Link to={`/products/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                />
            </Link>

            {/* Thông tin */}
            <div>
                <Link to={`/products/${product.id}`}>
                    <h4>{product.name}</h4>
                </Link>
                <p>{product.brand}</p>
                <div className="price-container">
                    <span className="price-current">
                        {product.price.toLocaleString()}đ
                    </span>
                    {product.priceRoot > product.price && (
                        <span className="price-old">
                            {product.priceRoot.toLocaleString()}đ
                        </span>
                    )}
                </div>
            </div>

            {/* Nút thao tác */}
            <div>
                <button
                    className={`add-cart-btn ${product.stock === 0 ? 'out-of-stock' : ''}`}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    {product.stock === 0 ? "Hết hàng" : "Thêm Vào Giỏ"}
                </button>
                <button
                    onClick={handleRemove}
                    className="remove-btn"
                    title="Xóa khỏi yêu thích"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default WishlistItem;