import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from './View/Components/navigator';

export const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Navigator />
    </>
  );
};

String.prototype.toFullLink = function (): string {
  let newString = this.replace('t.nhentai', 'i.nhentai');
  newString = newString.replace('t.jpg', '.jpg');
  return newString;
};
