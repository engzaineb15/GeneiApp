// src/Services/Auth.js
import AsyncStorage from '@react-native-async-storage/async-storage'

const getAccount = async () => {
  try {
    const user = await AsyncStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch (e) {
    return null
  }
}

const getFirst = async () => {
  try {
    const isFirst = await AsyncStorage.getItem('isFirst')
    return isFirst || '1'
  } catch (e) {
    return '1'
  }
}

const setAccount = async user => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user))
  } catch (e) {
    console.error('Error saving user data')
  }
}

const setFirst = async () => {
  try {
    await AsyncStorage.setItem('isFirst', '0')
  } catch (e) {
    console.error('Error saving first-time status')
  }
}

export default {
  getAccount,
  getFirst,
  setAccount,
  setFirst,
}
