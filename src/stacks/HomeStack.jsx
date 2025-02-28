import React from 'react';
import Home from '../screens/home/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FilimDetail from '../screens/filimdetail/FilimDetail';
import Onboarding from '../screens/onboarding/Onboarding';
import {useMMKVBoolean} from 'react-native-mmkv';
import Search from '../screens/search/Search';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  const [firstEntry, setFirstEntry] = useMMKVBoolean('firstEntry');

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={
        firstEntry === undefined || firstEntry === false ? 'Onboarding' : 'Home'
      }>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FilimDetail" component={FilimDetail} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default HomeStack;
