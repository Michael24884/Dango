import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRequest} from '../../Hooks/request';
import {BaseModels} from '../../Models/BaseModels';
import {PopularModel} from '../../Models/HomeModel';
import {ListItems, SearchBar} from '../Components/customs';
import DangoImage from '../Components/image';

const {height, width} = Dimensions.get('window');

const DiscoveryScreen = () => {
  const navigation = useNavigation();
  const {
    swr: {data},
  } = useRequest<PopularModel>('/', 'Popular', {animated: true});

  const renderPopularItem = ({item}: {item: BaseModels}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {url: item.url})}>
        <View style={styles.itemHeight}>
          <View
            style={{
              height: '85%',
              overflow: 'hidden',
            }}>
            <DangoImage url={item.image} style={styles.image} />
            <View style={styles.popularFloatingView}>
              <Text style={[styles.itemText, {fontSize: 12}]}>
                {item.language}
              </Text>
            </View>
          </View>

          <Text
            numberOfLines={3}
            lineBreakMode={'middle'}
            style={styles.itemText}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderJustAddedItem = ({item}: {item: BaseModels}) => {
    return (
      <ListItems
        item={item}
        onPress={() => navigation.navigate('Detail', {url: item.url})}
      />
    );
  };

  return (
    <ScrollView style={styles.view}>
      <View style={styles.searchView}>
        <SearchBar
          onSubmit={(e) => {
            const value = e.nativeEvent.text;
            if (Number(value))
              navigation.navigate('Detail', {url: '/g/' + value});
          }}
        />
      </View>
      <View style={styles.view2}>
        <Text style={styles.subTitle}>Popular</Text>
      </View>
      <View>
        {data ? (
          <FlatList
            data={data.popular}
            renderItem={renderPopularItem}
            horizontal
            keyExtractor={(item) => item.url}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
      {/* //Just Added */}
      <View>
        <Text style={styles.subTitle}>Just Added</Text>
        {data ? (
          <FlatList
            data={data.justAdded}
            renderItem={renderJustAddedItem}
            scrollEnabled={false}
            keyExtractor={(item) => item.url}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#222c4e',
  },
  view2: {
    marginTop: height * 0.03,
    marginLeft: 8,
  },
  subTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: 'white',
    marginBottom: height * 0.01,
  },
  listContainer: {
    paddingTop: height * 0.01,
    marginBottom: height * 0.02,
  },
  itemHeight: {
    height: height * 0.45,
    width: width * 0.65,
    margin: 8,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 6,
  },
  itemText: {
    fontSize: 16,
    color: 'white',
  },
  popularFloatingView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 5,
    paddingHorizontal: 12,
    backgroundColor: 'orange',
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 6,
  },
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
    flexShrink: 0.8,
    marginHorizontal: 5,
    color: 'white',
    fontSize: 16,
  },
  searchView: {
    flexDirection: 'row',
  },
});

export default DiscoveryScreen;
