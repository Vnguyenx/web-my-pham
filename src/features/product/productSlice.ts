import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { productApi } from '../../api/productApi';

interface ProductState {
    items: Product[];
    loading: boolean;
    error: string | null;
    selectedProduct: Product | null;
}

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null,
    selectedProduct: null,
};

// 1. Async Thunk để lấy toàn bộ sản phẩm
export const fetchAllProducts = createAsyncThunk(
    'products/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            // Sử dụng hàm getProducts bạn đã viết trong productApi.ts để đồng nhất
            const data = await productApi.getProducts();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Không thể lấy danh sách sản phẩm');
        }
    }
);

// 2. Async Thunk để lấy chi tiết 1 sản phẩm (Dùng cho trang Detail)
export const fetchProductById = createAsyncThunk(
    'products/fetchById',
    async (id: number | string, { rejectWithValue }) => {
        try {
            const data = await productApi.getProductById(id);
            return {
                ...data,
                benefits: data.benefits || [],
                usage: data.usage || [],
                descriptionDetail: data.descriptionDetail || "Nội dung đang được cập nhật...",
                specs: data.specs || { volume: "", origin: "", skinType: "", expiry: "" }
            };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'products', // Đảm bảo tên này khớp với tên khai báo trong store.ts
    initialState,
    reducers: {
        // Bạn có thể thêm action để clear sản phẩm đang chọn khi đóng modal/chuyển trang
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        }
    },
    extraReducers: (builder) => {
        /* FETCH ALL PRODUCTS */
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        /* FETCH PRODUCT BY ID */
        builder
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.selectedProduct = action.payload;
            });
    },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;