// src/features/wishlist/wishlistSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WishlistItem } from '../../types/Wishlist';
import { wishlistApi } from '../../api/wishlistApi';

/**
 * Interface định nghĩa state của wishlist trong Redux store
 */
interface WishlistState {
    items: WishlistItem[];
    loading: boolean;
    error: string | null;
}

const initialState: WishlistState = {
    items: [],
    loading: false,
    error: null,
};

/* ==========================================
   ASYNC THUNKS
========================================== */

/**
 * Lấy danh sách wishlist (API đã có _expand=product)
 */
export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (userId: number, { rejectWithValue }) => {
        try {
            const data = await wishlistApi.getWishlistByUserId(userId);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Không thể tải danh sách yêu thích');
        }
    }
);

/**
 * Thêm sản phẩm và "vá" thông tin sản phẩm từ ProductState vào để UI hiển thị ngay
 */
export const addToWishlistAsync = createAsyncThunk(
    'wishlist/addToWishlist',
    async (
        { userId, productId }: { userId: number; productId: number },
        { rejectWithValue, getState }
    ) => {
        try {
            const existing = await wishlistApi.checkProductInWishlist(userId, productId);
            if (existing) return rejectWithValue('Sản phẩm đã có trong danh sách yêu thích');

            const data = await wishlistApi.addToWishlist({ userId, productId });

            // KIỂM TRA LẠI Ở ĐÂY:
            const state = getState() as any;

            // Cách truy cập an toàn: Kiểm tra state.products có tồn tại không
            const allProducts = state.products?.items || state.product?.items || [];
            const productInfo = allProducts.find((p: any) => p.id === productId);

            return {
                ...data,
                product: productInfo // Nếu không tìm thấy, product sẽ là undefined
            } as WishlistItem;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Lỗi thêm vào yêu thích');
        }
    }
);

/**
 * Xóa sản phẩm khỏi wishlist
 */
export const removeFromWishlistAsync = createAsyncThunk(
    'wishlist/removeFromWishlist',
    async (
        { id, productId }: { id: number; productId: number },
        { rejectWithValue }
    ) => {
        try {
            await wishlistApi.removeFromWishlist(id);
            return productId; // Trả về productId để filter trong reducer
        } catch (error: any) {
            return rejectWithValue(error.message || 'Không thể xóa khỏi danh sách yêu thích');
        }
    }
);

/**
 * Xóa tất cả wishlist
 */
export const clearWishlistAsync = createAsyncThunk(
    'wishlist/clearWishlist',
    async (userId: number, { rejectWithValue }) => {
        try {
            await wishlistApi.clearUserWishlist(userId);
            return;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Không thể xóa danh sách yêu thích');
        }
    }
);

/* ==========================================
   REDUX SLICE
========================================== */

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearWishlistState: (state) => {
            state.items = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        /* FETCH WISHLIST */
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload; // Payload đã bao gồm item.product nhờ _expand
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        /* ADD TO WISHLIST */
        builder
            .addCase(addToWishlistAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishlistAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload); // Payload đã được "vá" object product
            })
            .addCase(addToWishlistAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        /* REMOVE FROM WISHLIST */
        builder
            .addCase(removeFromWishlistAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(
                    item => item.productId !== action.payload
                );
            })
            .addCase(removeFromWishlistAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        /* CLEAR WISHLIST */
        builder
            .addCase(clearWishlistAsync.fulfilled, (state) => {
                state.loading = false;
                state.items = [];
            });
    },
});

export const { clearError, clearWishlistState } = wishlistSlice.actions;
export default wishlistSlice.reducer;