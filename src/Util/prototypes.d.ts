import {Language} from '../Models/BaseModels';

interface String {
  filterLanguage(): Language;
  fromPreviewToFull(): string;
}
