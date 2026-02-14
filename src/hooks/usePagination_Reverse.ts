// src/hooks/usePagination.ts
import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface UsePaginationProps<T> {
    data: T[];              // Mảng dữ liệu cần phân trang
    itemsPerPage: number;   // Số lượng item trên 1 trang
    useUrlParams?: boolean; // Có sử dụng URL để lưu số trang không (?page=1)
    reverse?: boolean;      // Có đảo ngược danh sách không?
}

export const usePagination = <T,>({
                                      data,
                                      itemsPerPage,
                                      useUrlParams = false,
                                      reverse = false
                                  }: UsePaginationProps<T>) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // State dùng cho trường hợp phân trang nội bộ (không hiện lên URL)
    const [localPage, setLocalPage] = useState(1);

    // 1. Xác định trang hiện tại dựa trên cấu hình
    const currentPage = useMemo(() => {
        if (useUrlParams) {
            return parseInt(searchParams.get("page") || "1");
        }
        return localPage;
    }, [useUrlParams, searchParams, localPage]);

    // 2. Xử lý dữ liệu: Đảo ngược nếu cần (Dùng useMemo để tối ưu hiệu năng)
    const processedData = useMemo(() => {
        return reverse ? [...data].reverse() : data;
    }, [data, reverse]);

    // 3. Tính toán tổng số trang
    const totalPages = useMemo(() => {
        return Math.ceil(processedData.length / itemsPerPage) || 1;
    }, [processedData.length, itemsPerPage]);

    // 4. Hàm xử lý chuyển trang (Dùng useCallback để ổn định định danh hàm)
    const handlePageChange = useCallback((page: number) => {
        if (page < 1 || (totalPages > 0 && page > totalPages)) return;

        if (useUrlParams) {
            // Tạo một bản sao mới của params hiện tại để giữ lại các param khác (như category, q...)
            const newParams = new URLSearchParams(window.location.search);
            newParams.set("page", page.toString());
            setSearchParams(newParams); // Sử dụng hàm từ useSearchParams
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            setLocalPage(page);
        }
    }, [useUrlParams, totalPages, setSearchParams]);

    // 5. Cắt mảng dữ liệu cho trang hiện tại
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedData.slice(startIndex, startIndex + itemsPerPage);
    }, [processedData, currentPage, itemsPerPage]);

    // 6. Tự động đưa người dùng về trang cuối nếu trang hiện tại bị trống (do xóa item hoặc đổi tab)
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            handlePageChange(totalPages);
        }
    }, [totalPages, currentPage, handlePageChange]);

    return {
        currentItems,
        totalPages,
        currentPage,
        handlePageChange,
        totalItems: processedData.length
    };
};