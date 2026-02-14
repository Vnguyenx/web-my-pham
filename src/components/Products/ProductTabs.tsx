import { useState } from "react";
import { Product } from "../../types/Product";
import ProductReviews from "./ProductReviews";
import "../../styles/productTabs.css";

interface Props { product: Product; }

const ProductTabs = ({ product }: Props) => {
    const [activeTab, setActiveTab] = useState("usage");

    return (
        <div className="product-tabs">
            <div className="tab-headers">
                <button
                    className={activeTab === "usage" ? "active" : ""}
                    onClick={() => setActiveTab("usage")}
                >Hướng Dẫn Sử Dụng</button>
                <button
                    className={activeTab === "specs" ? "active" : ""}
                    onClick={() => setActiveTab("specs")}
                >Thông Số Kỹ Thuật</button>
                <button
                    className={activeTab === "reviews" ? "active" : ""}
                    onClick={() => setActiveTab("reviews")}
                >Đánh giá</button>
            </div>

            <div className="tab-content">
                {activeTab === "usage" && (
                    <div className="content-inner usage-tab">
                        <ol>
                            {(product.usage || []).length > 0 ? (
                                product.usage?.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))
                            ) : (
                                <li>Nội dung đang được cập nhật...</li>
                            )}
                        </ol>
                    </div>
                )}

                {activeTab === "specs" && (
                    <div className="content-inner specs-tab">
                        <table className="specs-table">
                            <tbody>
                            <tr>
                                <td>Dung tích</td>
                                <td>{product.specs?.volume || "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Xuất xứ</td>
                                <td>{product.specs?.origin || "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Loại da phù hợp</td>
                                <td>{product.specs?.skinType || "Mọi loại da"}</td>
                            </tr>
                            <tr>
                                <td>Hạn sử dụng</td>
                                <td>{product.specs?.expiry || "Xem trên bao bì"}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {/* SỬ DỤNG COMPONENT ĐÁNH GIÁ RIÊNG TẠI ĐÂY */}
                {activeTab === "reviews" && (
                    <div className="content-inner reviews-tab">
                        <ProductReviews productId={product.id} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;