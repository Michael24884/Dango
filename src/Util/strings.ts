/* eslint-disable prettier/prettier */
import {Language} from '../Models/BaseModels';

export const baseURL = 'https://nhentai.net';
export const defaultHeaders = {
  Accept: 'text/html,application/xhtml+xml,applicaiton/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-us',
  Connection: 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'User-Agent':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
};


// eslint-disable-next-line no-extend-native
String.prototype.filterLanguage = function (): Language {
  // eslint-disable-next-line no-undef
  const reg = new RegExp('\[\w+\]', i);
  const match = this.match(reg);
  if (match) {
      const string = match[0];
      if (string === 'english') return 'English';
      if (string === 'chinese' || string === 'oo君個人漢化') return 'Chinese';
  }
  else return 'Japanese';
  return 'Japanese';
};
