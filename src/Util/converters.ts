import {BaseModels} from '../Models/BaseModels';
import {DetailModel, PopularModel} from '../Models/HomeModel';
import cheerio from 'react-native-cheerio';
import {TagToLanguage} from './maps';

export type Conversions = 'Popular' | 'Detail';

export class Converter {
  document: string = '';
  conversion: Conversions = 'Popular';

  constructor(text: string, conversionType: Conversions) {
    this.document = text;
    this.conversion = conversionType;
  }

  modelMapper(): BaseModels[] | PopularModel | DetailModel {
    switch (this.conversion) {
      case 'Popular':
        return this.mapToBaseModel();
      case 'Detail':
        return this.mapToDetailBaseModel();
      default:
        throw 'This mapping has not been enabled';
    }
  }

  mapToBaseModel(): PopularModel {
    const $ = cheerio.load(this.document);
    const popular = $('div.index-popular > div.gallery')
      .toArray()
      .map((e: any) => {
        const link: string = $(e).find('a').attr('href');
        const title: string = $(e).find('div.caption').text();
        const image: string = $(e).find('img').attr('data-src');
        const tags: number[] = $(e)
          .attr('data-tags')
          .split(' ')
          .map((i: string) => Number(i));
        return {
          url: link,
          title,
          image,
          language: TagToLanguage.get(tags[0]) ?? 'Unknown',
        };
      });
    const justAdded = $('div.container.index-container')
      .last()
      .find('div.gallery')
      .toArray()
      .map((e: any) => {
        const link: string = $(e).find('a').attr('href');
        const title: string = $(e).find('div.caption').text();
        const image: string = $(e).find('img').attr('data-src');
        const tags: number[] = $(e)
          .attr('data-tags')
          .split(' ')
          .map((i: string) => Number(i));
        return {
          url: link,
          title,
          image,
          language: TagToLanguage.get(tags[0]) ?? 'Unknown',
        };
      });
    return {popular, justAdded, type: 'Home Page'};
  }

  mapToDetailBaseModel(): DetailModel {
    const $ = cheerio.load(this.document);
    const title = $('h1.title').find('span.pretty').text();
    const image = $('img.lazyload').attr('data-src');
    const romajiTitle = $('h2.title').find('span.pretty').text();
    const holyNumbers = ($('#gallery_id').text() as string).slice(1);
    const tagArray = $('#tags > div.tag-container.field-name').toArray();
    const artists = $(tagArray[3])
      .find('span.tags > a')
      .toArray()
      .map((i: any) => {
        const name = $(i).find('span.name').text();
        const link = $(i).attr('href');
        const count = $(i).find('span.count').text();
        return {link, name, count};
      });
    const tags = $(tagArray[2])
      .find('span.tags > a')
      .toArray()
      .map((i: any) => {
        const tagName = $(i).find('span.name').text();
        const tagLink = $(i).attr('href');
        const tagCount = $(i).find('span.count').text();
        return {name: tagName, link: tagLink, count: tagCount};
      });
    const parodies = $(tagArray[0])
      .find('span.tags > a')
      .toArray()
      .map((i: any) => {
        const name = $(i).find('span.name').text();
        const link = $(i).attr('href');
        return {link, name};
      });
    const groups = $(tagArray[4])
      .find('span.tags > a')
      .toArray()
      .map((i: any) => {
        const name = $(i).find('span.name').text();
        const link = $(i).attr('href');
        const count = $(i).find('span.count').text();
        return {link, name, count};
      });
    const languages = $(tagArray[5])
      .find('span.tags > a')
      .toArray()
      .map((i: any) => {
        const name = $(i).find('span.name').text();
        const link = $(i).attr('href');
        const count = $(i).find('span.count').text();
        return {link, name, count};
      });
    const categories = $(tagArray[6])
      .find('span.tags > a')
      .toArray()
      .map((i: any) => {
        const name = $(i).find('span.name').text();
        const link = $(i).attr('href');
        const count = $(i).find('span.count').text();
        return {link, name, count};
      });
    const pageCount = $(tagArray[7])
      .find('span.tags > a')
      .find('span.name')
      .text();
    const uploaded = $(tagArray[8]).find('time.nobold').attr('datetime');
    const images = $('div.container > div.thumbs > div.thumb-container')
      .toArray()
      .map((e: any) => {
        return $(e).find('img.lazyload').attr('data-src');
      });
    const moreLikeThis = $('#related-container > div.gallery')
      .toArray()
      .map((e: any) => {
        const title = $(e).find('div.caption').text();
        const image = $(e).find('img').attr('data-src');
        const link = $(e).find('a').attr('href');
        const language: number[] = $(e)
          .attr('data-tags')
          .split(' ')
          .map((i: string) => Number(i));
        return {
          title,
          image,
          link,
          language: TagToLanguage.get(language[0]) ?? 'Unknown',
        };
      });

      //15067, 8378,35763
    return {
      title,
      image,
      holyNumbers: Number(holyNumbers),
      romajiTitle,
      artists,
      tags,
      parodies,
      groups,
      categories,
      pageCount,
      languages,
      uploaded,
      images,
      moreLikeThis,
      type: 'Detailed',
    };
  }
}
