import React from 'react'
import HomeScreen from "../screens/home/HomeScreen"

const HomeStack = () => {
  return (
   <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
  )
}

export default HomeStack