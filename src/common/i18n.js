const languages = {
  ru: require('../../resources/languages/ru.json'),
  en: require('../../resources/languages/en.json'),
};

export default class i18n {
  static t(key) {
    let target = getLanguage();
    key = key.split('.');
    for (let i in key){
      target = target[key[i]];
    }
    return target;
  }
}

function getLanguage() {
  let localization = localStorage.getItem('language');
  if (!localization) {
    const localizationFromNavigator = navigator.language.slice(0, 2);
    if (languages[localizationFromNavigator]) {
      localization = localizationFromNavigator;
    } else {
      localization = 'en';
    }
    localStorage.setItem('language', localization);
  }
  return languages[localization];
}
