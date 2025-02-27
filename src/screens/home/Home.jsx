import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FilimList from '../../common/FilimList';
import {IP_URL, IMG_URL} from '@env';
import NetflixSvg from '../../../assets/icons/netflix.svg';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [poster, setPoster] = useState('');
  const [genres, setGenres] = useState([]);
  const [checkMoreInfo, setCheckMoreInfo] = useState(false);

  const navigation = useNavigation();

  const getMovies = async () => {
    try {
      const response = await axios.get(`${IP_URL}/movie/trending`, {
        headers: {
          Accept: 'application/json',
        },
      });

      setMovies(response.data.content);
      setPoster(response.data.content[0].poster_path);

      const responseDetail = await axios.get(
        `${IP_URL}/${'movie'}/${response.data.content[0].id}/details`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      setGenres(responseDetail.data.content.genres);
    } catch (error) {
      console.log(error);
    }
  };

  const getShows = async () => {
    try {
      const response = await axios.get(`${IP_URL}/tv/trending`, {
        headers: {
          Accept: 'application/json',
        },
      });

      setShows(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const start = async () => {
    await getMovies();
    await getShows();
  };

  useEffect(() => {
    start();
  }, []);

  return (
    <SafeAreaView className="bg-[#000000] flex-1">
      <View className="p-[20px] gap-[20px]">
        <View>
          <NetflixSvg className="w-[89px] h-[23px]" />
        </View>
      </View>

      <ScrollView className="relative">
        <View className="items-center">
          {poster != '' ? (
            <Image
              src={`${IMG_URL}${movies[0].poster_path}`}
              style={{width: 340, height: 440, borderRadius: 5}}></Image>
          ) : (
            <Text>Not Poster</Text>
          )}
          <View className="relative -top-[54px] flex-row gap-[10px]">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FilimDetail', {
                  id: movies[0].id,
                  type: movies[0].media_type,
                });
              }}
              className="
          bg-[#FFFFFF] 
          w-[160px] 
          h-[48px] 
          rounded-[4px]
          justify-center
          items-center
          ">
              <Text className="text-black text-[17px]  font-extrabold ">
                Play
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCheckMoreInfo(prevState => !prevState);
              }}
              className="
          bg-[#515451] 
          w-[160px] 
          h-[48px] 
          rounded-[4px]
          justify-center
          items-center
        
          ">
              <Text className="text-white text-[17px] font-extrabold ">
                More Info
              </Text>
            </TouchableOpacity>
          </View>

          {checkMoreInfo ? (
            <View className="absolute top-[340px] h-[46px]">
              <FlatList
                contentContainerStyle={{gap: 10, paddingBottom: 10}}
                data={genres}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                  return (
                    <Text className="text-white text-[12px] font-bold bg-[#27272A] p-[10px] rounded-[4] border-[2px] border-white">
                      {item.name}
                    </Text>
                  );
                }}
              />
            </View>
          ) : (
            <></>
          )}
        </View>

        <View className="relative -top-[20px]">
          <FilimList
            data={movies}
            title={'Trending Movies'}
            media_type={'movie'}
          />

          <FilimList
            data={shows}
            title={'Popular TV Shows'}
            media_type={'tv'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
