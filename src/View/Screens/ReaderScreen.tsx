import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import Reader from '../Components/Reader/reader';

const {height, width} = Dimensions.get('window');

const ReaderScreen: FC<{route: {params: {pages: string[]}}}> = (props) => {
  const {pages} = props.route.params;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.dangerouslyGetParent()?.setOptions({tabBarVisible: false});
    return () =>
      navigation.dangerouslyGetParent()?.setOptions({tabBarVisible: true});
  }, [navigation]);

  return (
    <View style={{height, width, backgroundColor: 'black'}}>
      <Reader
        pages={pages}
        onLongPressPage={() => {}}
        onTapPage={() => console.log('tap reaer')}
      />
    </View>
  );
};

export default ReaderScreen;
