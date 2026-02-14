import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/categories/categorySlice";
import wishlistReducer from '../features/wishlist/wishlistSlice';
import productReducer from "../features/product/productSlice";
import commentReducer from "../features/comment/commentSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoryReducer,
        wishlist: wishlistReducer,
        products: productReducer,
        comments: commentReducer,
        orders: orderReducer,
    },
});

// Kiểu cho TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
