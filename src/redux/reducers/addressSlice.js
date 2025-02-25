import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  addresses: [],
  loading: false,
  error: null,
}

const addressSlice = createSlice({
  name: 'addressList',
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false;
    },
    setLoading: state => {
      state.loading = true
      state.error = null
    },
    setError: (state, action) => {
      state.error =
        typeof action.payload === 'string'
          ? action.payload
          : action.payload?.message || 'Unknown error'
      state.loading = false
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        address => address.id !== action.payload
      )
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
  },
})

export const { setAddresses, setLoading, setError, removeAddress, addAddress } =
  addressSlice.actions

export default addressSlice.reducer
