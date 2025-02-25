import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/authScreens/Login'
import SignUp from '../screens/authScreens/SignUp'

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
