import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/Category";
import { BASE_URL } from "../../api/apiConfig";

interface CategoryState {
    list: Category[];
    loading: boolean;
}

const initialState: CategoryState = {
    list: [],
    loading: false,
};

// Fetch categories từ API
export const fetchCategories = createAsyncThunk<Category[]>(
    "categories/fetch",
    async () => {
        const res = await fetch(
            `${BASE_URL}/categories`
        );
        return res.json();
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.pending, state => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            });
    },
});

export default categorySlice.reducer;
