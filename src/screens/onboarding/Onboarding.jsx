import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import NetflixSvg from '../../../assets/icons/netflix.svg';
import {useMMKVBoolean} from 'react-native-mmkv';
import {useNavigation} from '@react-navigation/native';

const Onboarding = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [firstEntry, setFirstEntry] = useMMKVBoolean('firstEntry');
  const navigation = useNavigation();

  const pages = [
    {
      title: 'Watch on any device',
      description:
        'Stream on your phone, tablet, laptop, and TV without playing more',
      image: require('../../../assets/images/ob_1_img.png'),
    },
    {
      title: '3, 2, 1,... download!',
      description: 'Always have something to watch offline.',
      image: require('../../../assets/images/ob_2_img.png'),
    },
    {
      title: 'No pesky contracts.',
      description: 'Cancel anytime',
      image: require('../../../assets/images/ob_3_img.png'),
    },
    {
      title: 'How do I watch?',
      description:
        'Members that subscribe to Netflix can watch here in the app',
      image: require('../../../assets/images/ob_bg.png'),
    },
  ];

  return (
    <SafeAreaView className="bg-[#000000] flex-1">
      <View className="p-[20px] pt-[30px] gap-[20px] flex-1 justify-start">
        <View className="items-center">
          <NetflixSvg />
        </View>

        <Text className="absolute pt-[15px] text-[14px] top-0 right-0 mr-[40px] mt-[20px] text-white">
          Help
        </Text>

        <FlatList
          scrollEnabled={false}
          data={pages}
          renderItem={({item, index}) => {
            if (index === pageIndex) {
              return (
                <View className="items-center pt-[30px]">
                  {index === 3 ? (
                    <>
                      <Image
                        source={item.image}
                        style={{
                          position: 'relative',
                          bottom: 30,
                          height: 750,
                        }}
                      />

                      <View className="relative -top-[550px]">
                        <View className=" items-center pt-[10px] z-10">
                          <Text className="text-white font-bold text-[24px]">
                            {item.title}
                          </Text>
                          <Text className="text-center text-[20px] pt-[10px]">
                            {item.description}
                          </Text>
                        </View>
                        <View className="flex-row gap-[22px] justify-center pt-[210px] pb-[40px]">
                          {[0, 1, 2, 3].map(indicatorIndex => (
                            <View
                              key={indicatorIndex}
                              className={`pt-[10px] w-[12px] h-[12px] ${
                                pageIndex === indicatorIndex
                                  ? 'bg-[#E50914]'
                                  : 'bg-white'
                              }`}
                              style={{borderRadius: 6}}
                            />
                          ))}
                        </View>
                        <TouchableOpacity
                          className="bg-[#E50914] px-[20px] py-[10px] w-[360] rounded-[2px] items-center"
                          onPress={() => {
                            setPageIndex(prevState =>
                              Math.min(prevState + 1, pages.length - 1),
                            );
                            if (pageIndex == 3) {
                              setFirstEntry(true);
                              navigation.navigate('Home');
                            }
                          }}>
                          <Text className="font-extrabold text-black text-[18px]">
                            NEXT
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <Image
                        source={item.image}
                        style={{width: 200, height: 200}}
                      />
                      <View className="items-center pt-[10px] z-10">
                        <Text className="text-white font-bold text-[24px]">
                          {item.title}
                        </Text>
                        <Text className="text-center text-[20px] pt-[10px] h-[60px]">
                          {item.description}
                        </Text>
                      </View>
                      <View className="flex-row gap-[22px] justify-center pt-[210px] pb-[40px]">
                        {[0, 1, 2, 3].map(indicatorIndex => (
                          <View
                            key={indicatorIndex}
                            className={`pt-[10px] w-[12px] h-[12px] ${
                              pageIndex === indicatorIndex
                                ? 'bg-[#E50914]'
                                : 'bg-white'
                            }`}
                            style={{borderRadius: 6}}
                          />
                        ))}
                      </View>
                      <TouchableOpacity
                        className="bg-[#E50914] px-[20px] py-[10px] w-full rounded-[2px] items-center"
                        onPress={() => {
                          setPageIndex(prevState =>
                            Math.min(prevState + 1, pages.length - 1),
                          );
                        }}>
                        <Text className="font-extrabold text-black text-[18px]">
                          NEXT
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              );
            }
            return null;
          }}
          keyExtractor={(item, index) => index.toString()}
          pagingEnabled
          onMomentumScrollEnd={e => {
            const contentOffsetY = e.nativeEvent.contentOffset.y;
            const index = Math.floor(contentOffsetY / 200);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
