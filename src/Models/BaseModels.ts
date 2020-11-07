export type Language = 'English' | 'Chinese' | 'Japanese' | 'Unknown';
type BaseTyped = 'Home Page' | 'Detailed';

export type BaseModels = {
  title: string;
  image: string;
  url: string;
  language: Language;
};

export type BaseType = {
  type: BaseTyped;
};
