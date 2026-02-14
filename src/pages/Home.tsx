import { useEffect, useState } from "react";

import { getComments } from "../api/commentApi";

import { Comment } from "../types/Comment";
import Banner from "../components/Home/Banner";
import ProductSlider from "../components/Home/ProductSlider";
import "../styles/home.css";
import { fetchAllProducts } from "../features/product/productSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";

const Home = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.items);

    useEffect(() => {
        // Gọi action fetch của Redux
        dispatch(fetchAllProducts());

        // Fetch comments (nếu chưa đưa comments vào Redux)
        getComments().then(setComments);
    }, [dispatch]);

    return (
        <div className="home">
            {/* Banner */}
            <Banner products={products} />

            {/* Hot */}
            <ProductSlider
                title="🔥 Sản phẩm bán chạy"
                products={[...products].sort(
                    (a, b) => b.sold - a.sold
                )}
                comments={comments}
            />

            {/* Sale */}
            <ProductSlider
                title="💸 Đang giảm giá"
                products={products.filter(
                    p => p.discountPercent > 0
                )}
                comments={comments}
            />

            {/* Rating */}
            <ProductSlider
                title="⭐ Đánh giá cao"
                products={[...products].sort(
                    (a, b) => b.rating - a.rating
                )}
                comments={comments}
            />
        </div>
    );
};

export default Home;
