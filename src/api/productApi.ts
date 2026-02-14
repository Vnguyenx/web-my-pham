import { Product } from "../types/Product";

import { BASE_URL } from "./apiConfig";


export const productApi = {
    /**
     * Lấy tất cả sản phẩm
     */
    getProducts: async (): Promise<Product[]> => {
        const res = await fetch(`${BASE_URL}/products`);
        if (!res.ok) throw new Error("Không thể tải danh sách sản phẩm");
        return res.json();
    },

    /**
     * Lấy chi tiết 1 sản phẩm theo ID
     * Rất quan trọng khi click từ wishlist vào xem chi tiết
     */
    getProductById: async (id: number | string): Promise<Product> => {
        const res = await fetch(`${BASE_URL}/products/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
        return res.json();
    },

    /**
     * Tìm kiếm sản phẩm theo tên
     */
    searchProducts: async (query: string): Promise<Product[]> => {
        const res = await fetch(`${BASE_URL}/products?name_like=${query}`);
        if (!res.ok) throw new Error("Lỗi tìm kiếm");
        return res.json();
    },

    /**
     * Cập nhật số lượng tồn kho (Dùng sau khi thanh toán thành công)
     */
    updateProductStock: async (productId: number, newStock: number): Promise<Product> => {
        const res = await fetch(`${BASE_URL}/products/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ stock: newStock }),
        });

        if (!res.ok) throw new Error("Không thể cập nhật số lượng tồn kho");
        return res.json();
    }
};