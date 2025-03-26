import { createSlice } from "@reduxjs/toolkit"

const storedUser = JSON.parse(localStorage.getItem("user"))
const storedAuth = localStorage.getItem("isAuthenticated") === "true";

const initialState = {
    user: storedUser || null,
    isAuthenticated: storedAuth,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;

            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("isAuthenticated", "true");
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;

            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
        }
    }
})

export const { login, logout, } = authSlice.actions;
export default authSlice.reducer;