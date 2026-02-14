import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
}

/* ======================
   INIT STATE
====================== */
const initialState: AuthState = {
    isLoggedIn: !!localStorage.getItem("user"),
    user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /* ======================
           LOGIN
        ====================== */
        loginSuccess(state, action: PayloadAction<User>) {
            state.isLoggedIn = true;
            state.user = action.payload;

            // Lưu session
            localStorage.setItem(
                "user",
                JSON.stringify(action.payload)
            );
        },

        /* ======================
           LOGOUT
        ====================== */
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem("user");
        },

        /* ======================
           UPDATE USER (AVATAR / INFO)
        ====================== */
        updateUserSuccess(state, action: PayloadAction<User>) {
            state.user = action.payload;

            // cập nhật lại localStorage
            localStorage.setItem(
                "user",
                JSON.stringify(action.payload)
            );
        },
    },
});

export const {
    loginSuccess,
    logout,
    updateUserSuccess,
} = authSlice.actions;

export default authSlice.reducer;
