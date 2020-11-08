import React, {createRef, FC, useState} from 'react';
import {StyleSheet, ScrollView, Dimensions, Text, View} from 'react-native';
//import ViewPager from '@react-native-community/viewpager';
import Pages from './pages';
import {ReaderTopBar} from './bars';
import {useNavigation} from '@react-navigation/native';
import {ViewPager} from 'react-native-viewpager-carousel';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');

interface Props {
  pages: string[];
  onTapPage: () => void;
  onLongPressPage: () => void;
  startingPage?: number;
}

const Reader: FC<Props> = (props) => {
  const {pages, onTapPage, onLongPressPage, startingPage} = props;
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState<number>(startingPage ?? 0);
  const [canScroll, setCanScroll] = useState<boolean>(true);

  const [canZoom, setZoom] = useState<boolean>(true);

  const scrollController = createRef<ScrollView>();

  const topBarValue = useSharedValue(0);

  const areBarOpened = () => topBarValue.value === 0;

  const touchBars = () => {
    topBarValue.value = withTiming(
      topBarValue.value === 0 ? -height * 0.25 : 0,
    );
  };

  const _renderPages = ({data}: {data: any}) => (
    <Pages page={data.page} onPress={touchBars} canMove={setCanScroll} />
  );

  return (
    <>
      <View style={styles.pageTextView}>
        <Text style={styles.text}>
          {currentPage === 0 ? 1 : currentPage} / {pages.length}
        </Text>
      </View>
      <ScrollView ref={scrollController} scrollEnabled={false}>
        <ViewPager
          initialPage={currentPage}
          style={styles.view}
          scrollEnabled={canScroll}
          overScrollMode={'never'}
          onScroll={(sc: number) => {
            setZoom(sc % 5 === 0);
          }}
          onPageChange={(event: any) => {
            scrollController.current?.scrollResponderZoomTo({
              x: 0,
              y: 0,
              width,
              height,
            });
            setCurrentPage(event);
            if (areBarOpened()) touchBars();
          }}
          data={pages.map((i) => ({page: i}))}
          renderPage={_renderPages}
          lazyrender
          lazyrenderThreshold={4}
          renderAsCarousel={false}
        />
      </ScrollView>
      <ReaderTopBar
        pageNumber={currentPage}
        totalPagesCount={pages.length}
        requestClose={() => navigation.goBack()}
        top={topBarValue}
      />
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    height,
    width,
    backgroundColor: 'black',
  },
  scrollView: {
    height,
    width,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'center',
  },
  pageTextView: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: height * 0.08,
  },
});

export default Reader;
