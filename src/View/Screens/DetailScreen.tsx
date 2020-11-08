import React, {FC, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Dimensions,
  Text,
  Platform,
} from 'react-native';
import {useRequest} from '../../Hooks/request';
import {DetailModel, SimilarTaste} from '../../Models/HomeModel';
import * as Colors from '../../Util/colors';
import DangoImage from '../Components/image';
import Timeago from 'react-native-timeago';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-dynamic-vector-icons';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

interface Props {
  route: {params: {url: string}};
}

const DetailScreen: FC<Props> = (props) => {
  const {url} = props.route.params;
  const navigation = useNavigation();
  const {
    swr: {data},
    controller,
  } = useRequest<DetailModel>(url, 'Detail', {animated: true});

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title,
    });
    return () => controller.abort();
  }, [controller, navigation, data]);

  if (!data)
    return (
      <View style={styles.view.loading}>
        <ActivityIndicator />
      </View>
    );

  const _renderPreviewImages = ({item}: {item: string}) => {
    return <DangoImage url={item} style={styles.previews.images} />;
  };

  const _renderMoreLikeThis = ({item}: {item: SimilarTaste}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Detail', {url: item.link})}>
        <View style={styles.moreLikeThis.itemView}>
          <View style={styles.moreLikeThis.imageHeader}>
            <DangoImage
              url={item.image}
              style={styles.moreLikeThis.imageView}
            />
            <View style={styles.moreLikeThis.language}>
              <Text style={styles.view.minorTitles}>{item.language}</Text>
            </View>
          </View>
          <Text
            numberOfLines={4}
            allowFontScaling
            minimumFontScale={0.8}
            style={styles.view.subTitles}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const Rows = (title: string, data: string) => {
    return (
      <View
        style={[
          styles.view.coverView,
          {
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 5,
          },
        ]}>
        <Text style={styles.view.subTitles}>{title}</Text>
        <Text
          style={[
            styles.view.minorTitles,
            {flexShrink: 0.7, textAlign: 'right'},
          ]}>
          {data}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.view.view}>
      <View style={styles.view.coverView}>
        <DangoImage url={data.image!} style={styles.view.image} />
        <View style={styles.view.coverTextView}>
          <View>
            {Rows('Digits', data.holyNumbers.toString())}
            {Rows('Artists', data.artists.map((i) => i.name).join(', '))}
            {Rows('Languages', data.languages.map((i) => i.name).join(', '))}
            {Rows('Categories', data.categories.map((i) => i.name).join(', '))}
            <View style={{alignSelf: 'center', marginTop: 6}}>
              <Text style={styles.view.subTitles}>Uploaded</Text>
              <Timeago style={styles.view.minorTitles} time={data.uploaded} />
            </View>
          </View>
          {Rows('Total Pages', data.pageCount.toString())}
        </View>
      </View>
      <Text style={styles.view.title}>{data.title}</Text>
      <View style={styles.tags.view}>
        {data.tags.map((i) => (
          <View key={i.link} style={styles.tags.container}>
            <Text style={styles.tags.text}>{i.name}</Text>
          </View>
        ))}
      </View>
      {/* //Preview Row */}
      <View style={styles.previews.view}>
        <View style={styles.previews.previewPlayView}>
          <Text style={styles.view.subSectionTitles}>Previews</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Reader', {pages: data.images})}>
            <View style={styles.previews.previewPlayButtonView}>
              <View style={styles.previews.playButton} />
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name={'play'}
                  type={'MaterialCommunityIcons'}
                  size={width * 0.13}
                  color={'white'}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={
            data.images.length >= 15 ? data.images.slice(0, 15) : data.images
          }
          renderItem={_renderPreviewImages}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* //More Like This */}
      {data.moreLikeThis && data.moreLikeThis.length > 0 ? (
        <View style={{marginTop: height * 0.03}}>
          <Text style={styles.view.subSectionTitles}>More Like This</Text>
          <FlatList
            scrollEnabled={false}
            data={data.moreLikeThis}
            renderItem={_renderMoreLikeThis}
            numColumns={2}
            keyExtractor={(item) => item.link}
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = {
  view: StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: Colors.hBack,
      padding: 8,
    },
    coverView: {
      flexDirection: 'row',
    },
    coverTextView: {
      padding: 8,
      flex: 1,
      justifyContent: 'space-between',
    },
    loading: {
      flex: 1,
      backgroundColor: Colors.hBack,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: height * 0.3,
      width: width * 0.45,
      marginTop: height * 0.01,
    },
    title: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: height * 0.015,
    },
    subTitles: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    subSectionTitles: {
      color: 'white',
      fontSize: 23,
      fontWeight: '700',
      marginBottom: 8,
    },
    minorTitles: {
      color: 'white',
      fontSize: 13,
      fontWeight: '500',
    },
  }),
  tags: StyleSheet.create({
    view: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      marginTop: 12,
    },
    container: {
      padding: 8,
      backgroundColor: Colors.hRed,
      borderRadius: 4,
      margin: 4,
    },
    text: {
      color: 'white',
      fontSize: 14,
      fontWeight: '700',
    },
  }),
  previews: StyleSheet.create({
    view: {
      marginTop: height * 0.015,
      marginBottom: height * 0.035,
    },
    images: {
      height: height * 0.27,
      width: width * 0.4,
      marginHorizontal: width * 0.012,
    },
    previewPlayView: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    previewPlayButtonView: {
      height: height * 0.08,
      aspectRatio: 1 / 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
      transform: [{scale: 0.85}],
      ...Platform.select({
        android: {
          elevation: 4,
        },
      }),
    },
    playButton: {
      backgroundColor: Colors.hRed,
      height: height * 0.08,
      aspectRatio: 1 / 1,
      borderRadius: (height * 0.08) / 2,
    },
  }),
  moreLikeThis: StyleSheet.create({
    itemView: {
      height: height * 0.3,
      width: width * 0.43,
      flex: 1 / 2,
      margin: 8,
      marginBottom: height * 0.1,
    },
    imageHeader: {
      height: '90%',
      width: '100%',
      marginBottom: 5,
    },
    language: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'orange',
      padding: 5,
    },
    imageView: {
      height: '100%',
      width: '100%',
    },
  }),
};

export default DetailScreen;
