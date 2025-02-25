import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import AllStackScreens from './AllStackScreens'


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AllStackScreens />
    </NavigationContainer>
  )
}

export default AppNavigator
