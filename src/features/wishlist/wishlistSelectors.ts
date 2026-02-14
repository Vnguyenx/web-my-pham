// src/features/wishlist/wishlistSelectors.ts

import { RootState } from '../../app/store';

/**
 * SELECTORS - Các hàm để lấy data từ Redux state
 * Giúp tách biệt logic lấy data và component
 */

/**
 * Lấy toàn bộ mảng wishlist items
 * @param state - Root state của Redux
 * @returns Mảng các WishlistItem
 */
export const selectWishlistItems = (state: RootState) => state.wishlist.items;

/**
 * Lấy trạng thái loading
 * @param state - Root state của Redux
 * @returns true nếu đang loading, false nếu không
 */
export const selectWishlistLoading = (state: RootState) => state.wishlist.loading;

/**
 * Lấy error message
 * @param state - Root state của Redux
 * @returns Error message hoặc null
 */
export const selectWishlistError = (state: RootState) => state.wishlist.error;

/**
 * Kiểm tra 1 sản phẩm có trong wishlist không
 * @param state - Root state của Redux
 * @param productId - ID của sản phẩm cần kiểm tra
 * @returns true nếu có, false nếu không
 */
export const selectIsInWishlist = (state: RootState, productId: number): boolean => {
    return state.wishlist.items.some(item => item.productId === productId);
};

/**
 * Lấy wishlist item theo productId
 * @param state - Root state của Redux
 * @param productId - ID của sản phẩm
 * @returns WishlistItem hoặc undefined nếu không tìm thấy
 */
export const selectWishlistItemByProductId = (
    state: RootState,
    productId: number
) => {
    return state.wishlist.items.find(item => item.productId === productId);
};
