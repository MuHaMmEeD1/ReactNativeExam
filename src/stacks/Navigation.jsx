import {NavigationContainer} from '@react-navigation/native';
import {useMMKVString} from 'react-native-mmkv';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import {Text} from 'react-native';

const Navigation = () => {
  const [token, setToken] = useMMKVString('token');

  return (
    <NavigationContainer>
      {token ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
