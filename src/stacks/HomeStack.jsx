import React from 'react';
import Home from '../screens/home/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FilimDetail from '../screens/filimdetail/FilimDetail';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FilimDetail" component={FilimDetail} />
    </Stack.Navigator>
  );
};

export default HomeStack;
