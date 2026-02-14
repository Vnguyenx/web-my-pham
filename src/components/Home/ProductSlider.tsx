import { Product } from "../../types/Product";
import { Comment } from "../../types/Comment";
import ProductCard from "../../components/ProductCard";
import "../../styles/productSlider.css";

interface Props {
    title: string;
    products: Product[];
    comments: Comment[];
}

const ProductSlider = ({ title, products, comments }: Props) => {
    // Map productId -> số comment
    const commentCountMap = comments.reduce<Record<number, number>>(
        (acc, c) => {
            acc[c.productId] = (acc[c.productId] || 0) + 1;
            return acc;
        },
        {}
    );

    return (
        <section className="product-slider">
            <h2 className="slider-title">{title}</h2>

            <div className="slider-list">
                {products.slice(0, 4).map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        commentCount={commentCountMap[product.id] || 0}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProductSlider;
