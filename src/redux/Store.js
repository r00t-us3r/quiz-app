import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/AuthSlice";

export const Store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
