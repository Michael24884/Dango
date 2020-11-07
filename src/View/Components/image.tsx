import React, {FC} from 'react';
import {StyleProp, View} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';

interface FastImageProps {
  url: string;
  style: StyleProp<ImageStyle>;
}

const DangoImage: FC<FastImageProps> = (props) => {
  const {url, style} = props;

  return (
    <FastImage
      style={[style]}
      source={{uri: url, cache: FastImage.cacheControl.web}}
      resizeMode={FastImage.resizeMode.cover}
    />
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

export default DangoImage;
