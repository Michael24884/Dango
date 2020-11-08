import React, {FC, useState} from 'react';
import {Dimensions} from 'react-native';
import DangoImage from '../image';
import ZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');

const Pages: FC<{
  page: string;
  canMove: (arg0: boolean) => void;
  onPress: () => void;
  canZoom: boolean;
}> = (props) => {
  const realPage = props.page.toFullLink();

  const [canZoom, setZoom] = useState<boolean>(true);
  function event(event: any, gesture: any, zoomObject: any) {
    const scale: number = zoomObject.zoomLevel;
    if (zoomObject.distanceLeft < 0 && scale > 1) setZoom(false);
    else if (zoomObject.distanceLeft > 0 && !canZoom) setZoom(true);
    if (scale <= 1.0) props.canMove(true);
    else props.canMove(false);
  }

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <ZoomableView
        maxZoom={3}
        minZoom={1}
        initialZoom={1}
        bindToBorders={true}
        movementSensibility={1.2}
        zoomEnabled={canZoom}
        zoomStep={0.24}
        onZoomAfter={event}>
        <DangoImage url={realPage} style={{height, width}} resize={'contain'} />
      </ZoomableView>
    </TouchableWithoutFeedback>
  );
};

export default Pages;
