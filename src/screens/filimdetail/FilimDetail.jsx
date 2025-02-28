import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useMMKVString} from 'react-native-mmkv';
import {IP_URL, IMG_URL} from '@env';
import {useNavigation, useRoute} from '@react-navigation/native';
import FilimList from '../../common/FilimList';

const FilimDetail = () => {
  const route = useRoute();
  const {id, type} = route.params;
  const [data, setData] = useState({});
  const [similarData, setSimilarData] = useState({});
  const [genres, setGenres] = useState([]);
  const [trailerKey, setTrailerKey] = useState('');
  const [token, setToken] = useMMKVString('token');

  const navigation = useNavigation();

  const getData = async () => {
    try {
      const response = await axios.get(`${IP_URL}/${type}/${id}/details`, {
        headers: {
          Accept: 'application/json',
        },
      });

      setGenres(response.data.content.genres);

      setData(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrailers = async () => {
    try {
      const response = await axios.get(`${IP_URL}/${type}/${id}/trailers`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setTrailerKey(response.data.trailers[0].key);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarData = async () => {
    try {
      const response = await axios.get(`${IP_URL}/${type}/${id}/similar`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setSimilarData(response.data.similar);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getTrailers();
    getSimilarData();
  }, [id, type]);

  return (
    <SafeAreaView className="bg-[#000000] flex-1">
      <View className="gap-[10px]">
        <YoutubePlayer height={240} videoId={trailerKey} />

        <View className="flex-row items-center justify-between px-4">
          <Text className="text-white text-[36px]">
            {type === 'movie' ? data.title : data.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Image
              source={require('../../../assets/images/home.png')}
              style={{width: 40, height: 40, marginRight: 20, marginTop: 10}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingLeft: 20,
            paddingBottom: 10,
            maxWidth: 360,
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: 10,
          }}>
          {genres.map((item, index) => (
            <Text
              key={index}
              className="text-white text-[12px] bg-[#27272A] p-[10px] rounded-[4]">
              {item.name}
            </Text>
          ))}
        </View>
      </View>
      <ScrollView>
        <View className="gap-[10px]">
          <Text className="text-white pl-[15px] leading-[1.8] w-[320px]">
            {data.overview}
          </Text>

          <FilimList
            data={similarData}
            title={type === 'movie' ? 'Similar Movies' : 'Similar TV Shows'}
            media_type={type}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FilimDetail;
