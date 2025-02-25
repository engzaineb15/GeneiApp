// src/redux/reducers/UserReducer.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: false,
  user: null,
  token: null,
  isFirst: true,
  netInfo: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.token = action.payload.token
      state.login = true
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    modifyIsFirst: (state, action) => {
      state.isFirst = action.payload
    },
    modifyNetInfo: (state, action) => {
      state.netInfo = action.payload
    },
    logout: state => {
      state.user = null
      state.login = false
      state.token = null
    },
  },
})

export const { setUser, modifyIsFirst, modifyNetInfo, logout, setToken } =
  userSlice.actions

export default userSlice.reducer
