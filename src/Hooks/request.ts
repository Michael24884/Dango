import {LayoutAnimation, Platform, UIManager} from 'react-native';
import useSwr, {ConfigInterface} from 'swr';
import {BaseType} from '../Models/BaseModels';
import {Conversions, Converter} from '../Util/converters';
import * as Defaults from '../Util/strings';

if (Platform.OS === 'android')
  if (UIManager.setLayoutAnimationEnabledExperimental)
    UIManager.setLayoutAnimationEnabledExperimental(true);

type RequestConfig = {
  isJson?: boolean;
  animated?: boolean;
};
const defaultConfigs: RequestConfig = {
  isJson: false,
  animated: false,
};

export function useRequest<T extends BaseType>(
  path: string,
  dataType: Conversions,
  config: RequestConfig = defaultConfigs,
) {
  const {isJson, animated} = config;
  // eslint-disable-next-line no-undef
  const controller = new AbortController();

  const fetcher = (url: string) =>
    fetch(Defaults.baseURL + url, {
      headers: Defaults.defaultHeaders,
      signal: controller.signal,
    })
      .then((response) => (isJson ? response.json() : response.text()))
      .then((data) => new Converter(data, dataType).modelMapper());
  const _config: ConfigInterface = {
    onLoadingSlow: () => {},
    onSuccess: () => {
      if (animated)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    },
    //Refreshes every 5 minutes
    refreshInterval:
      Platform.OS === 'android' || dataType !== 'Popular' ? 0 : 600000,
  };
  //@ts-ignore
  return {swr: useSwr<T>(path, fetcher, _config), controller};
}
