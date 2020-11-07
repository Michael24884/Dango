import React from 'react';
import {StyleSheet, Dimensions, ScrollView, Text, View} from 'react-native';
import * as Colors from '../../Util/colors';
import {Avatars} from '../Components/image';

const {height, width} = Dimensions.get('window');

const SettingsScreen = () => {
  const row1 = () => {
    return (
      <View style={[styles.surface, styles.row1]}>
        {/* //Placeholder - Requires static assets */}
        <Avatars url={'https://i.imgur.com/uLAimaY.png?fb'} size={75} />
        <Text style={styles.rowTitles}>Guest</Text>
      </View>
    );
  };

  return <ScrollView style={styles.view}>{row1()}</ScrollView>;
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.hBack,
    flex: 1,
  },
  surface: {
    backgroundColor: Colors.hDarkBack,
    padding: 8,
    marginVertical: 12,
    flexDirection: 'row',
  },
  row1: {
    marginVertical: height * 0.06,
  },
  rowTitles: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
  },
});

export default SettingsScreen;
