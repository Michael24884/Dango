import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, StyleProp, StyleSheet, View} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface FastImageProps {
  url: string;
  style: StyleProp<ImageStyle>;
  resize?: 'cover' | 'contain' | 'stretch';
}

const DangoImage: FC<FastImageProps> = (props) => {
  const {url, style, resize} = props;
  const [loadingVisible, setLoadingVisisble] = useState<boolean>(true);
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({opacity: opacity.value}));
  useEffect(() => {
    if (opacity.value === 0) setLoadingVisisble(false);
  }, [opacity]);

  return (
    <View style={[style]}>
      <FastImage
        style={styles.image.base}
        source={{uri: url, cache: FastImage.cacheControl.web}}
        resizeMode={resize ?? 'cover'}
        onLoad={() => {
          opacity.value = withTiming(0, {duration: 650});
        }}
      />
      {loadingVisible ? (
        <Animated.View style={[styles.image.floatingView, animatedStyle]}>
          <View style={styles.image.loadingView}>
            <ActivityIndicator />
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

interface AvatarProps {
  url: string;
  size?: number;
}

export const Avatars: FC<AvatarProps> = (props): JSX.Element => {
  const {url, size} = props;
  return (
    <View
      style={{
        borderRadius: (size ?? 24) / 2,
        height: size ?? 24,
        width: size ?? 24,
        overflow: 'hidden',
      }}>
      <DangoImage url={url} style={{height: '100%', width: '100%'}} />
    </View>
  );
};

const styles = {
  image: StyleSheet.create({
    base: {
      height: '100%',
      width: '100%',
    },
    floatingView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
};

export default DangoImage;
