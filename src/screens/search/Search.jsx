import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IP_URL, IMG_URL} from '@env';
import {useMMKVString} from 'react-native-mmkv';
import FilimList from '../../common/FilimList';

const Search = () => {
  const [artists, setArtists] = useState([]);
  const [movie, setMovie] = useState([]);
  const [shows, setShows] = useState([]);
  const [token, setToken] = useMMKVString('token');
  const [searchData, setSearchData] = useState('');

  const getArtists = async () => {
    try {
      const response = await axios.get(
        `${IP_URL}/search/person/${searchData}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setArtists(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const getMovie = async () => {
    try {
      const response = await axios.get(`${IP_URL}/search/movie/${searchData}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setMovie(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const getShows = async () => {
    try {
      const response = await axios.get(`${IP_URL}/search/tv/${searchData}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setShows(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const start = () => {
    getArtists();
    getMovie();
    getShows();
  };

  const searchEvent = () => {
    start();
  };

  return (
    <SafeAreaView className="bg-[#000000] flex-1">
      <View className="p-[20px] gap-[20px] ">
        <TouchableOpacity
          className="p-[15px] absolute right-[30] top-[20] z-[5]"
          onPress={() => {
            searchEvent();
          }}>
          <Image source={require('../../../assets/images/searchGray.png')} />
        </TouchableOpacity>

        <TextInput
          maxLength={30}
          placeholder="Search for shows, movies or artists..."
          value={searchData}
          onChangeText={setSearchData}
          className="border-[gray] border-[1px] p-[10px] ml-[5px] mr-[5px] rounded-[3px] text-white"
        />

        <Text className="text-[24px] text-white pt-[20px]">Artists</Text>

        <FlatList
          contentContainerStyle={{gap: 30}}
          horizontal
          data={artists}
          renderItem={({item}) => (
            <View>
              {item.profile_path == null ? (
                <Image
                  source={require('../../../assets/images/defaultProfile.png')}
                  style={{height: 70, width: 70}}
                />
              ) : (
                <Image
                  src={`${IMG_URL}${item.profile_path}`}
                  style={{height: 70, width: 70, borderRadius: 35}}
                />
              )}

              <Text className="text-center pt-[10px] text-[14px]">
                {item.name}
              </Text>
            </View>
          )}
        />

        <FilimList data={movie} title={'Movies'} media_type={'movie'} />
        <FilimList data={shows} title={'TV Shows'} media_type={'tv'} />
      </View>
    </SafeAreaView>
  );
};

export default Search;
