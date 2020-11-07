import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import * as Colors from '../../Util/colors';

const EmptyScreen: FC<{message: string}> = (props) => {
  const {message} = props;

  return (
    <View style={styles.view}>
      <Icon name={'error'} type={'MaterialIcons'} size={45} color={'red'} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.hBack,
  },
  message: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default EmptyScreen;
