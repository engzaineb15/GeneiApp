import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/UserReducer'
import addressList from './reducers/addressSlice'
import cartReducer from './reducers/cartReducer'
import productsReducer from './reducers/productsReducer'
import ordersReducer from './reducers/ordersSlice'

export const store = configureStore({
  reducer: {
    UserReducer: userReducer, // Reducer is under the 'UserReducer' key
    addressList: addressList,
    cart: cartReducer,  // Name of the slice should match
    products : productsReducer,
    orders : ordersReducer
  },
})
