import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCategories : [],
    recentlyAdded : [],
    allBrands : [],
    mostBuyed : [],
    flashSale : [],
    specialOffer : []
}

const productsSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
        setAllCategories: (state, action) => {
            state.allCategories = action.payload;
        },
        setRecentlyAdded: (state, action) => {
            state.recentlyAdded = action.payload;
        },
        setAllBrands: (state, action) => {
            state.allBrands = action.payload;
        },
        setMostBuyed: (state, action) => {
            state.mostBuyed = action.payload;
        },
        setFlashSale: (state, action) => {
            state.flashSale = action.payload;
        },
        setSpecialOffer: (state, action) => {
            state.specialOffer = action.payload;
        }
    }
})

export const { 
    setAllCategories, 
    setRecentlyAdded, 
    setAllBrands, 
    setMostBuyed,
    setFlashSale,
    setSpecialOffer } = productsSlice.actions

export default productsSlice.reducer