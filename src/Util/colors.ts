export const hRed = '#ec2753';
export const hBack = '#222c4e';
export const hDarkBack = '#000f42';

export type DangoThemeBase = {
  statusBarColor: 'light-content' | 'default';
  backgroundColor: string;
  text: string;
};

export const DefaultTheme: DangoThemeBase = {
  statusBarColor: 'light-content',
  backgroundColor: hBack,
  text: 'white',
};
