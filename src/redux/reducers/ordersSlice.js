import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    finishedOrders : [],
    currentOrders : []
}

const orderSlice = createSlice({
    name : 'Orders',
    initialState,
    reducers : {
        setCurrentOrders : (state, action) => {
            state.currentOrders = action.payload
        },
        setFinishedtOrders : (state, action) => {
            state.finishedOrders = action.payload
        },
        removeCanceledOrder: (state, action) => {
            state.currentOrders = state.currentOrders.filter(order => order.id !== action.payload);
        }
    }
})

export const {setCurrentOrders, setFinishedtOrders, removeCanceledOrder } = orderSlice.actions

export default orderSlice.reducer