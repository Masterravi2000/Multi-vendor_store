import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../../types";

interface CartState {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {}
})

export default cartSlice.reducer;