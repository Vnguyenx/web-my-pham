// src/api/wishlistApi.ts

import { WishlistItem, CreateWishlistDto } from '../types/Wishlist';

import { BASE_URL } from "./apiConfig";

export const wishlistApi = {
    /**
     * LẤY DANH SÁCH: Thêm _expand=product để lấy đầy đủ object product
     */
    getWishlistByUserId: async (userId: number): Promise<WishlistItem[]> => {
        try {
            //Thêm &_expand=product vào URL
            const response = await fetch(`${BASE_URL}/wishlist?userId=${userId}&_expand=product`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: WishlistItem[] = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            throw error;
        }
    },

    /**
     * THÊM MỚI: Khi thêm mới, server thường trả về object vừa tạo.
     * Lưu ý: Object trả về lúc này có thể chưa có trường 'product' ngay lập tức
     * trừ khi bạn load lại danh sách hoặc server hỗ trợ trả về expand ngay khi POST.
     */
    addToWishlist: async (dto: CreateWishlistDto): Promise<WishlistItem> => {
        try {
            const body = {
                userId: dto.userId,
                productId: dto.productId,
                createdAt: new Date().toISOString(),
            };

            const response = await fetch(`${BASE_URL}/wishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: WishlistItem = await response.json();
            return data;
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            throw error;
        }
    },

    /**
     * XÓA: Giữ nguyên
     */
    removeFromWishlist: async (id: number): Promise<void> => {
        try {
            const response = await fetch(`${BASE_URL}/wishlist/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return;
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            throw error;
        }
    },

    /**
     * KIỂM TRA: Giữ nguyên logic query theo userId & productId
     */
    checkProductInWishlist: async (userId: number, productId: number): Promise<WishlistItem | null> => {
        try {
            const response = await fetch(
                `${BASE_URL}/wishlist?userId=${userId}&productId=${productId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: WishlistItem[] = await response.json();
            return data.length > 0 ? data[0] : null;
        } catch (error) {
            console.error('Error checking wishlist:', error);
            throw error;
        }
    },

    /**
     * XÓA TẤT CẢ: Giữ nguyên
     */
    clearUserWishlist: async (userId: number): Promise<void> => {
        try {
            const items = await wishlistApi.getWishlistByUserId(userId);
            await Promise.all(
                items.map(item => wishlistApi.removeFromWishlist(item.id))
            );
            return;
        } catch (error) {
            console.error('Error clearing wishlist:', error);
            throw error;
        }
    },
};