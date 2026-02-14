import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProductById, fetchAllProducts } from "../features/product/productSlice";
import Breadcrumb from "../components/Breadcrumb";
import ProductInfo from "../components/Products/ProductInfo";
import ProductTabs from "../components/Products/ProductTabs";
import "../styles/productDetail.css";
import ProductRelated from "../components/Products/ProductRelated";
import {useBreadcrumbs} from "../hooks/useBreadcrumbs";


const ProductDetail = () => {
    // 1. Lấy ID sản phẩm từ URL (ví dụ: /product/1)
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    // 2. Lấy dữ liệu từ Redux Store
    // items: dùng để lọc sản phẩm liên quan
    // selectedProduct: dữ liệu chi tiết của sản phẩm hiện tại
    const { selectedProduct, items, loading } = useAppSelector((state) => state.products);

    // 3. Sử dụng Hook Breadcrumb (truyền selectedProduct để tạo đường dẫn động)
    const breadcrumbItems = useBreadcrumbs(selectedProduct);

    useEffect(() => {
        if (id) {
            // Lấy thông tin chi tiết sản phẩm
            dispatch(fetchProductById(id));

            // Nếu danh sách sản phẩm chung chưa có thì tải về (phục vụ mục liên quan)
            if (items.length === 0) {
                dispatch(fetchAllProducts());
            }
        }

        // Luôn cuộn lên đầu trang mỗi khi ID thay đổi (đổi sản phẩm)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id, dispatch, items.length]);

    // Trạng thái đang tải dữ liệu
    if (loading || !selectedProduct) {
        return <div className="loading">Đang tải chi tiết sản phẩm...</div>;
    }

    return (
        <div className="container product-detail-page">
            <Breadcrumb items={breadcrumbItems} />

            {/* PHẦN 1: THÔNG TIN CHÍNH (Ảnh & Giá & Mua hàng) */}
            <ProductInfo product={selectedProduct} />

            {/* PHẦN 2: TABS CHI TIẾT */}
            <ProductTabs product={selectedProduct} />

            {/* PHẦN 3: SẢN PHẨM LIÊN QUAN */}
            <ProductRelated
                currentProduct={selectedProduct}
                allItems={items}
            />
        </div>
    );
};

export default ProductDetail;