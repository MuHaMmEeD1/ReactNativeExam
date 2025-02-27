import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {useMMKVString} from 'react-native-mmkv';
import AuthInput from '../../common/AuthInput';
import NetflixSvg from '../../../assets/icons/netflix.svg';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {IP_URL} from '@env';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [token, setToken] = useMMKVString('token');
  const navigation = useNavigation();

  const SignInEvent = async () => {
    try {
      const response = await axios.post(`${IP_URL}/auth/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log(response.data.token);
      setToken(response.data.token);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <SafeAreaView className="bg-[#000000] flex-1">
      <View className="p-[20px] gap-[20px]">
        <View>
          <NetflixSvg className="w-[89px] h-[23px]" />
        </View>

        <Text className="text-white text-[32px] font-bold mt-4 pt-[130px] pb-[10px]">
          Sign In
        </Text>

        <AuthInput
          name={'email'}
          placeholder={'Email'}
          value={formData?.email}
          setFormData={setFormData}
        />

        <AuthInput
          name={'password'}
          placeholder={'Password'}
          value={formData?.password}
          setFormData={setFormData}
        />

        <TouchableOpacity
          className="bg-red-600 p-3 rounded-lg mt-4"
          onPress={SignInEvent}>
          <Text className="text-white text-center font-semibold text-[16px]">
            Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center"
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <View className="flex-row items-center">
            <Text className="text-[#FFFFFFB2] text-[16px]">
              New to Netflix?
            </Text>
            <Text className="text-white ml-2 text-[16px]">Sign up now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
