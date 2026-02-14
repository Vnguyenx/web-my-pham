import { useMemo } from "react";
import { Product } from "../../types/Product";
import ProductCard from "../ProductCard";
import "../../styles/relatedProducts.css";
import { usePagination } from "../../hooks/usePagination_Reverse"

interface Props {
    currentProduct: Product;
    allItems: Product[];
}


const ProductRelated = ({ currentProduct, allItems }: Props) => {

    // 1. Logic Lọc: Lấy sản phẩm cùng subCategory và loại trừ sản phẩm hiện tại
    const filteredRelated = useMemo(() => {
        return allItems.filter(
            (p) => p.subCategory === currentProduct.subCategory && p.id !== currentProduct.id
        );
    }, [allItems, currentProduct]);

    // 2. Logic Phân Trang
    const { currentItems, totalPages, currentPage, handlePageChange } = usePagination({
        data: filteredRelated,
        itemsPerPage: 4,
        useUrlParams: false
    });

    if (filteredRelated.length === 0) return null;

    return (
        <section id="related-section" className="related-products">
            <div className="section-header">
                <h2 className="section-title">Sản phẩm liên quan</h2>
                <span className="page-info">Trang {currentPage} / {totalPages}</span>
            </div>

            <div className="product-grid">
                {currentItems.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ← Trước
                    </button>

                    <div className="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Sau →
                    </button>
                </div>
            )}
        </section>
    );
};

export default ProductRelated;