import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './languages/en.json';
import it from './languages/it.json';

const translation = {
  it,
  en,
};
const i18n = new I18n(translation);

i18n.translations = translation;
i18n.fallbacks = true;
i18n.locale = 'it';

export default i18n;
