import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import AuthInput from '../../common/AuthInput';
import axios from 'axios';
import {IP_URL} from '@env';
import NetflixSvg from '../../../assets/icons/netflix.svg';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigation = useNavigation();

  const SignUpEvent = async () => {
    try {
      const response = await axios.post(`${IP_URL}/auth/signup`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      console.log('Response:', response);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <SafeAreaView className="bg-[#000000] flex-1">
      <View className="p-[20px] gap-[20px]">
        <View>
          <NetflixSvg className="w-[89px] h-[23px]" />
        </View>

        <Text className="text-white text-[32px] font-bold mt-4 pt-[130px] pb-[10px]">
          SignUp
        </Text>

        <AuthInput
          name={'username'}
          placeholder={'UserName'}
          value={formData?.userName}
          setFormData={setFormData}
        />

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
          onPress={SignUpEvent}>
          <Text className="text-white text-center font-semibold text-[16px]">
            Sign Up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center"
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <View className=" items-center">
            <Text className="text-[#FFFFFFB2] text-[16px]">
              Already have an to Netflix?{' '}
            </Text>
            <Text className="text-white ml-2 text-[16px]">Sign In</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
