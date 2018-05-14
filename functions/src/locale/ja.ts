const words = {
  hp: 'HP',
  atk: '攻撃',
  spd: '速さ',
  def: '守備',
  res: '魔防',
  s3: '星3',
  s4: '星4',
  s5: '星5',
  lv1: 'レベル1',
  lv40: 'レベル40',
  eqp: 'スキルあり',
  uneqp: 'スキルなし',
};

const tutorial =`
はじめまして。このアプリは、スマホゲーム「ファイアーエムブレムヒーローズ」のキャラクター個体を確認することができます。
レアリティ、レベル、スキルの有無と英雄名を教えて頂ければ、該当する英雄の基準値を返答します。
`;

const welcome = 'どの英雄を調べたいですか？';

const error = '申し訳ございません。エラーが発生しています。';

const continueRes = '<speak>ほかに調べたい英雄はありますか？</speak>';

const ivRes = ({rarity, level, name, stats}) => `
  <speak>${rarity}、${level}の${name}の基準値はこちらです<break time="500ms" />。
  HP ${stats.hp}、<break time="300ms"/>
  攻撃 ${stats.atk}、<break time="300ms"/>
  速さ ${stats.spd}、<break time="300ms"/>
  守備 ${stats.def}、<break time="300ms"/>
  魔防 ${stats.res}。
</speak>`;

const notFoundRes = ({rarity, level, name}) => `${rarity}、${level}の${name}の基準値が見つかりません`;

export {
  words,
  tutorial,
  welcome,
  error,
  ivRes,
  notFoundRes,
  continueRes,
};
