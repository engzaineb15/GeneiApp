import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const api = axios.create({
  baseURL: 'https://api.example.com/api',
})

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.error(error.response.data)
      console.error(error.response.status)
      console.error(error.response.headers)
    } else if (error.request) {
      console.error(error.request)
    } else {
      console.error('Error', error.message)
    }
    return Promise.reject(error)
  }
)

export default api
