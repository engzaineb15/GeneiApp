import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems : [],
    totalQuantity: 0
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addItem : (state, action) => {
            state.cartItems.push(action.payload)
        },
        updateItem : (state, action) => {
            const { cartItemId, newQuantity} = action.payload
            const item = state.cartItems.find(i => i.cart_item_id === cartItemId)
            if(item) {
                item.quantity_in_cart = newQuantity > 0 ? newQuantity : 1
            }
        },
        removeItem : (state, action) => {
            state.cartItems = state.cartItems.filter(
                i => i.cart_item_id !== action.payload
            )
        },
        resetCart: (state) => {
            state.cartItems = []; // Reset cart items
            state.totalQuantity = 0; // Reset total quantity
        },
        setTotalQuantity: (state, action) => {
            state.totalQuantity += action.payload; // Add the quantity change
        }
    }
})

export const selectTotalQuantity = (state) => {
    if (!state.cart || !state.cart.cartItems) return 0;
    return state.cart.cartItems.reduce((total, item) => total + item.quantity_in_cart, 0);
}

export const {addItem, updateItem, removeItem, resetCart, setTotalQuantity} = cartSlice.actions


export default cartSlice.reducer