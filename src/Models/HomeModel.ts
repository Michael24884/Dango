import {BaseModels, BaseType, Language} from './BaseModels';

export type PopularModel = {
  popular: BaseModels[];
  justAdded: BaseModels[];
} & BaseType;

export type DetailModel = {
  title: string;
  image?: string;
  author?: string;
  romajiTitle?: string;
  holyNumbers: number;
  tags: Tags[];
  parodies: Parodies[];
  artists: ArtistsGroups[];
  groups: ArtistsGroups[];
  languages: LanguagesModel[];
  categories: LanguagesModel[];
  pageCount: number;
  uploaded: string;
  images: string[];
  moreLikeThis?: SimilarTaste[];
  // favoriteCount: number;
} & BaseType;

export type LanguagesModel = {
  link: string;
  name: string;
  tagNumber: number;
  count?: string;
};

export type ArtistsGroups = {
  link: string;
  name: string;
  count: string;
};

export type Parodies = {
  link: string;
  name: string;
};

export type Tags = {
  link: string;
  name: string;
  count?: string;
};

export type SimilarTaste = {
  title: string;
  image: string;
  link: string;
  language: Language;
};
