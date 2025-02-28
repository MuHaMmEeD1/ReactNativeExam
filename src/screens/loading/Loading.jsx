import {View, SafeAreaView, ActivityIndicator, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import NetflixSvg from '../../../assets/icons/netflixBig.svg';

const Loading = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 3,
        duration: 2500,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView className="bg-[#000000] flex-1 justify-center items-center">
      <View className="flex-1 justify-center items-center">
        <View className="relative bottom-[100px]">
          <NetflixSvg className="w-[89px] h-[23px]" />
        </View>
        <Animated.View
          style={{
            transform: [{rotate: spin}],
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 100,
          }}>
          <ActivityIndicator size={100} color="#E50914" />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Loading;
