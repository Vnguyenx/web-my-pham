import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../types/Order';
import { getOrdersByUserId } from '../../api/orderApi';

interface OrderState {
    items: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    items: [],
    loading: false,
    error: null,
};

// Async Thunk để lấy danh sách đơn hàng theo UserId
export const fetchOrders = createAsyncThunk(
    'orders/fetchByUserId',
    async (userId: number, { rejectWithValue }) => {
        try {
            // Sử dụng hàm đã có trong orderApi.ts
            const data = await getOrdersByUserId(userId);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Không thể lấy danh sách đơn hàng');
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // Xóa đơn hàng khỏi store khi logout
        clearOrders: (state) => {
            state.items = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;