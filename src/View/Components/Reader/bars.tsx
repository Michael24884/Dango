import React, {FC} from 'react';
import {
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import * as Colors from '../../../Util/colors';

const {height, width} = Dimensions.get('window');

interface TopBarProps {
  pageNumber: number;
  totalPagesCount: number;
  requestClose: () => void;
  top: Animated.SharedValue<number>;
}

export const ReaderTopBar: FC<TopBarProps> = (props) => {
  const {pageNumber, requestClose, totalPagesCount, top} = props;
  const animatedTop = useAnimatedStyle(() => ({
    top: top.value,
  }));

  return (
    <Animated.View style={[styles.topBar.floatingView, animatedTop]}>
      <View style={styles.topBar.setterView}>
        <Text style={styles.topBar.title}>
          {(pageNumber === 0 ? 1 : pageNumber).toString()} /{' '}
          {totalPagesCount.toString()}
        </Text>
        <View style={styles.topBar.buttonView}>
          <Button title={'Close'} onPress={requestClose} color={Colors.hRed} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = {
  topBar: StyleSheet.create({
    floatingView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: Platform.OS === 'ios' ? height * 0.13 : height * 0.1,
      backgroundColor: Colors.hBack,
      justifyContent: 'flex-end',
    },
    setterView: {
      width,
      marginBottom: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonView: {
      position: 'absolute',
      bottom: -height * 0.001,
      right: 5,
      justifyContent: 'flex-end',
    },
    fakeView: {
      flex: 1 / 3.5,
    },
    title: {
      color: 'white',
      fontSize: 16,
      fontWeight: '700',
      alignSelf: 'center',
    },
    close: {
      color: Colors.hRed,
    },
  }),
};
