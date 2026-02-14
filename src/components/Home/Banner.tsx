import { useState } from "react";
import { Product } from "../../types/Product";
import { useNavigate } from "react-router-dom";
import "../../styles/banner.css";

interface Props {
    products: Product[];
}

const Banner = ({ products }: Props) => {
    const navigate = useNavigate();

    // index của slide đang hiển thị
    const [current, setCurrent] = useState(0);

    // chỉ lấy 4 sản phẩm cho banner
    const banners = products.slice(0, 4);

    // sang slide trước
    const prevSlide = () => {
        setCurrent(prev =>
            prev === 0 ? banners.length - 1 : prev - 1
        );
    };

    // sang slide tiếp theo
    const nextSlide = () => {
        setCurrent(prev =>
            prev === banners.length - 1 ? 0 : prev + 1
        );
    };
    if (products.length === 0) return <div className="banner skeleton"></div>;

    return (
        <div className="banner">
            <div className="banner-track" style={{transform: `translateX(-${current * 100}%)`}}>
                {banners.map((product, index) => (
                    <div key={product.id} className="banner-item">
                        <img src={product.image} alt={product.name}/>
                        <div className="banner-info">
                            <h3>{product.name}</h3>
                            <p>{product.descriptionShort}</p>
                            <button onClick={() => navigate(`/products/${product.id}`)}>
                                Xem Ngay
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ===== MŨI TÊN ===== */}
            <button className="banner-arrow left" onClick={prevSlide}>
                ‹
            </button>
            <button className="banner-arrow right" onClick={nextSlide}>
                ›
            </button>
        </div>
    );
};

export default Banner;
