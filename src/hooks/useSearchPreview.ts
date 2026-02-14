// src/hooks/useSearchPreview.ts
import { useState, useEffect } from 'react';
import { productApi } from '../api/productApi';
import { Product } from '../types/Product';

export const useSearchPreview = (query: string, delay: number = 300) => {
    const [results, setResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // 1. Nếu từ khóa quá ngắn, xóa kết quả cũ và thoát
        if (!query.trim() || query.length < 2) {
            setResults([]);
            return;
        }

        // 2. Thiết lập Debounce
        const handler = setTimeout(async () => {
            setIsLoading(true);
            try {
                const data = await productApi.searchProducts(query);
                // Chỉ lấy tối đa 5-6 sản phẩm để làm preview
                setResults(data.slice(0, 6));
            } catch (error) {
                console.error("Search Preview Error:", error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, delay);

        // 3. Cleanup function: Xóa timer nếu người dùng tiếp tục gõ
        return () => clearTimeout(handler);
    }, [query, delay]);

    return { results, isLoading };
};