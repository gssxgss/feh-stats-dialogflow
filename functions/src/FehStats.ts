import * as ja from './locale/ja';
import * as en from './locale/en';

const DATA = require('../data.json');

const localeData = {ja, en};

export class FehStats {

  static tutorial(userLocale): string {
    const lang: string = this.getLang(userLocale);
    return localeData[lang].tutorial;
  }

  static greet(userLocale): string {
    const lang: string = this.getLang(userLocale);
    return localeData[lang].welcome;
  }

  static apologize(userLocale): string {
    const lang: string = this.getLang(userLocale);
    return localeData[lang].error;
  }

  static isContinue(userLocale): string {
    const lang: string = this.getLang(userLocale);
    return localeData[lang].continueRes;
  }

  static getIV(userLocale, {rarityKey, levelKey, nameKey, isEqp}): string {
    const lang: string = this.getLang(userLocale);
    const locale: any = localeData[lang];

    const chara = DATA[nameKey];
    const name = chara.name[lang];
    let key = `${rarityKey}_${levelKey}`;
    if ((rarityKey === 's5' || levelKey === 'lv1') && isEqp) key += '_equipped';
    const stats = chara.stats[key];
    const rarity = locale.words[rarityKey];
    const level = locale.words[levelKey];

    if (!stats) return locale.notFoundRes({rarity, level, name});
    return locale.ivRes({rarity, level, name, stats});
  }

  static getBoonBane(userLocale, {nameKey}): string {
    const lang: string = this.getLang(userLocale);
    const locale: any = localeData[lang];

    const chara = DATA[nameKey];
    const name = chara.name[lang];
    const variation = chara['stats_variation'];

    return locale.boonBaneRes({name, variation});
  }

  /**
   * get user language
   * @param {string} userLocale
   * @return {string}
   */
  private static getLang(userLocale = 'ja'): string {
    return userLocale.length > 2 ? userLocale.slice(0, 2) : userLocale;
  }

}
