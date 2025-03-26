import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/authSlice'
import taskReducer from "../store/tasksSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
})

export default store;