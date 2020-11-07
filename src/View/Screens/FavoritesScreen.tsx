import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useUserAccount} from '../../Util/store';
import EmptyScreen from './EmptyScreen';
import * as Colors from '../../Util/colors';

const FavoritesScreen = () => {
  const user = useUserAccount((_) => _.profile);

  if (!user) return <EmptyScreen message={'You are currently not logged in'} />;
  return <View style={styles.view}></View>;
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Colors.hBack,
  },
});

export default FavoritesScreen;
