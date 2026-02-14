import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getComments } from '../../api/commentApi';
import {BASE_URL} from "../../api/apiConfig";

interface CommentState {
    items: Comment[];
    loading: boolean;
}

const initialState: CommentState = {
    items: [],
    loading: false,
};

export const fetchAllComments = createAsyncThunk(
    'comments/fetchAll',
    async () => {
        return await getComments();
    }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder
            .addCase(fetchAllComments.pending, (state) => { state.loading = true; })
            .addCase(fetchAllComments.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            });

        builder.addCase(addCommentAsync.fulfilled, (state, action) => {
            state.items.unshift(action.payload); // Đẩy comment mới lên đầu danh sách
        });
    },
});

export const addCommentAsync = createAsyncThunk(
    'comments/addComment',
    async (newComment: Omit<Comment, 'id'>, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newComment)
            });
            if (!response.ok) throw new Error('Không thể gửi bình luận');
            return await response.json(); // Trả về comment đã có ID từ server
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);



export default commentSlice.reducer;