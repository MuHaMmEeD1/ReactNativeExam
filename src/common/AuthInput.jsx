import React from 'react';
import {TextInput} from 'react-native';

const AuthInput = ({name, placeholder, value, setFormData}) => {
  return (
    <TextInput
      secureTextEntry={
        name === 'password' || name === 'repeat_password' ? true : false
      }
      defaultValue={value}
      onChangeText={text => {
        setFormData(prevState => ({
          ...prevState,
          [name]: name === 'email' ? text.toLowerCase() : text,
        }));
      }}
      placeholder={placeholder}
      placeholderTextColor={'#FFFFFFB2'}
      className="
        border-[1px]
       border-[#FFFFFFB2]
        pl-4 
        text-[#FFFFFFB2]
        rounded-[5px]
        text-[16px]
        pt-[14px]
        pb-[14px]

        "
    />
  );
};

export default AuthInput;
