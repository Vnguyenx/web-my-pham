// src/pages/ProductPage.tsx
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAllProducts } from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Products/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/products.css";
import {usePagination} from "../hooks/usePagination_Reverse";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";



const ProductPage = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    // 1. Lấy dữ liệu từ Redux Store
    const { items, loading } = useAppSelector((state) => state.products);
    const { list: categories } = useAppSelector((state) => state.categories);


    // 2. Fetch dữ liệu khi lần đầu vào trang
    useEffect(() => {
        if (items.length === 0) dispatch(fetchAllProducts());
    }, [dispatch, items.length]);

    // 3. Lấy các tham số lọc từ URL (category, sub-category, search query)
    const catId = searchParams.get("category");
    const subName = searchParams.get("sub");
    const searchQuery = searchParams.get("q")?.toLowerCase();


    // 4. Logic Lọc Sản Phẩm (Dùng useMemo để tối ưu hiệu năng)
    const filteredProducts = useMemo(() => {
        return items.filter(p => {
            const matchesCat = !catId || p.category === catId;
            const matchesSub = !subName || p.subCategory === subName;
            const matchesSearch = !searchQuery ||
                p.name.toLowerCase().includes(searchQuery) ||
                p.brand.toLowerCase().includes(searchQuery);
            return matchesCat && matchesSub && matchesSearch;
        });
    }, [items, catId, subName, searchQuery]);

    // 5. Sử dụng Hook phân trang dùng chung (Generic Pagination)
    const {
        currentItems,
        totalPages,
        currentPage,
        handlePageChange
    } = usePagination({
        data: filteredProducts,
        itemsPerPage: 8,
        useUrlParams: true // Quan trọng: Trang sản phẩm cần lưu số trang lên URL
    });

    // 6. Sử dụng Hook Breadcrumb dùng chung
    const breadcrumbItems = useBreadcrumbs();

    // 7. Tìm Category hiện tại để hiển thị tiêu đề (H1)
    const currentCategory = categories.find(c => c.id === catId);

        if (loading) return <div className="loading">Đang tải...</div>;

    return (
        <div className="container">
            {/* ✅ BREADCRUMB ĐỘNG */}
            <Breadcrumb items={breadcrumbItems} />

            <div className="product-page-layout">
                <Sidebar />

                <main className="product-main">
                    <div className="product-list-header">
                        <h1>
                            {subName || currentCategory?.name || (searchQuery ? `Kết quả cho "${searchQuery}"` : "Tất cả sản phẩm")}
                        </h1>
                        <p>{filteredProducts.length} sản phẩm</p>
                    </div>

                    {/* Grid Sản phẩm */}
                    <div className="product-grid">
                        {currentItems.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Phân trang */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                ← Trước
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <button
                                    key={p}
                                    className={currentPage === p ? "active" : ""}
                                    onClick={() => handlePageChange(p)}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Sau →
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductPage;