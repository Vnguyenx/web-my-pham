// src/hooks/useBreadcrumbs.ts
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { Product } from "../types/Product";

interface BreadcrumbItem {
    label: string;
    path: string;
}

export const useBreadcrumbs = (currentProduct?: Product | null) => {
    const [searchParams] = useSearchParams();
    const { list: categories } = useAppSelector((state) => state.categories);

    // Lấy thông tin từ URL
    const catId = searchParams.get("category");
    const subName = searchParams.get("sub");
    const searchQuery = searchParams.get("q");

    return useMemo(() => {
        const items: BreadcrumbItem[] = [
            { label: "Trang chủ", path: "/" },
            { label: "Sản phẩm", path: "/products" },
        ];

        // 1. Nếu đang ở trang Chi tiết sản phẩm
        if (currentProduct) {
            items.push({
                label: currentProduct.category,
                path: `/products?category=${currentProduct.category}`
            });
            items.push({ label: currentProduct.name, path: "" });
            return items;
        }

        // 2. Nếu đang ở trang Danh sách (lọc theo Category)
        const currentCategory = categories.find(c => c.id === catId);
        if (currentCategory) {
            items.push({
                label: currentCategory.name,
                path: `/products?category=${catId}`
            });

            if (subName) {
                items.push({
                    label: subName,
                    path: `/products?category=${catId}&sub=${subName}`
                });
            }
        }
        // 3. Nếu đang tìm kiếm
        else if (searchQuery) {
            items.push({
                label: `Tìm kiếm: ${searchQuery}`,
                path: `/products?q=${searchQuery}`
            });
        }

        return items;
    }, [categories, catId, subName, searchQuery, currentProduct]);
};