import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useMMKVString} from 'react-native-mmkv';
import {IP_URL, IMG_URL} from '@env';
import {useRoute} from '@react-navigation/native';
import FilimList from '../../common/FilimList';

const FilimDetail = () => {
  const route = useRoute();
  const {id, type} = route.params;
  const [data, setData] = useState({});
  const [similarData, setSimilarData] = useState({});
  const [genres, setGenres] = useState([]);
  const [trailerKey, setTrailerKey] = useState('');
  const [token, setToken] = useMMKVString('token');

  const getData = async () => {
    try {
      const response = await axios.get(`${IP_URL}/${type}/${id}/details`, {
        headers: {
          Accept: 'application/json',
        },
      });

      setGenres(response.data.content.genres);

      console.log(data);

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

  console.log('\n');
  console.log(id);
  console.log(type);
  console.log('\n');

  return (
    <SafeAreaView className="bg-[#000000] flex-1">
      <View className="gap-[10px]">
        <YoutubePlayer height={240} videoId={trailerKey} />

        <Text className="text-white text-[36px] pl-[15px]">
          {type == 'movie' ? data.title : data.name}
        </Text>

        <FlatList
          style={{paddingLeft: 15}}
          contentContainerStyle={{gap: 10, paddingBottom: 10}}
          data={genres}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            console.log(item);
            return (
              <Text className="text-white text-[12px] bg-[#27272A] p-[10px] rounded-[4]">
                {item.name}
              </Text>
            );
          }}
        />
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
