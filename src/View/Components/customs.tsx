import React, {FC, useEffect, useState} from 'react';
import {
  Dimensions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {BaseModels} from '../../Models/BaseModels';
import DangoImage from './image';

const {height, width} = Dimensions.get('window');

export const SearchBar: FC<{
  onSubmit: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
}> = (props) => {
  const {onSubmit} = props;
  const [query, setQuery] = useState<string>('');
  const offset = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (query.length > 0) {
      offset.value = withSpring(1.25, {
        damping: 0.9,
        stiffness: 15,
        velocity: 0.4,
      });
      opacity.value = withTiming(1);
    } else {
      offset.value = withTiming(1);
      opacity.value = withTiming(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: 'transparent',
      transform: [{scale: offset.value}],
    };
  });
  const opacityStyle = useAnimatedStyle(() => ({opacity: opacity.value}));

  return (
    <View style={styles.view.view}>
      <Animated.View style={animatedStyle}>
        <Icon
          name={'magnify'}
          type={'MaterialCommunityIcons'}
          size={25}
          color={'grey'}
        />
      </Animated.View>
      <View style={styles.view.input}>
        <TextInput
          onSubmitEditing={onSubmit}
          value={query}
          onChangeText={setQuery}
          placeholder={'Insert a 6-digit number or a title'}
          placeholderTextColor={'grey'}
        />
      </View>
      {query.length > 0 ? (
        <Animated.View style={opacityStyle}>
          <Icon
            name={'close'}
            type={'MaterialCommunityIcons'}
            size={25}
            color={'grey'}
            onPress={() => setQuery('')}
          />
        </Animated.View>
      ) : null}
    </View>
  );
};

export const ListItems: FC<{item: BaseModels; onPress: () => void}> = (
  props,
) => {
  const {item, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.lists.justAddedView}>
        <DangoImage url={item.image} style={styles.lists.justAddedImage} />
        <View style={styles.lists.textContainer}>
          <Text style={styles.lists.justAddedText}>{item.title}</Text>
          <Text style={styles.lists.language}>{item.language}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  view: StyleSheet.create({
    view: {
      flexDirection: 'row',
      marginTop: height * 0.02,
      alignSelf: 'center',
      marginHorizontal: width * 0.02,
      backgroundColor: 'white',
      padding: 18,
      borderRadius: 12,
      overflow: 'hidden',
    },
    input: {
      width: '85%',
      justifyContent: 'center',
      paddingLeft: 5,
    },
  }),
  textInput: StyleSheet.create({
    placeholder: {
      color: 'grey',
    },
  }),
  lists: StyleSheet.create({
    justAddedView: {
      flexDirection: 'row',
      height: height * 0.2,
      width,
      padding: 8,
    },
    justAddedImage: {
      height: '100%',
      width: '30%',
      borderRadius: 4,
    },
    justAddedText: {
      color: 'white',
      fontSize: 16,
    },
    textContainer: {
      flexShrink: 0.8,
      justifyContent: 'space-between',
      marginHorizontal: 5,
    },
    language: {
      color: 'orange',
      fontSize: 13,
    },
  }),
};
