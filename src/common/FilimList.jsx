import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {IMG_URL} from '@env';

const FilimList = ({data, title, media_type}) => {
  const navigation = useNavigation();

  return (
    <View className="gap-[15px] pb-[20px]">
      <Text className="text-[20px] text-white">{title}</Text>
      <FlatList
        contentContainerStyle={{gap: 20}}
        horizontal
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.push('FilimDetail', {
                id: item.id,
                type: media_type,
              });
            }}
            className="">
            <Image
              className="w-[118px] h-[173px]"
              src={`${IMG_URL}${item.poster_path}`}></Image>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FilimList;
