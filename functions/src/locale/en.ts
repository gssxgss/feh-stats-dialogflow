import {combineBoonBane, divideBoonBane} from "../utils";

const words = {
  hp: 'HP',
  atk: 'attack',
  spd: 'speed',
  def: 'defense',
  res: 'resistance',
  s3: '3 stars',
  s4: '4 stars',
  s5: '5 stars',
  lv1: 'level 1',
  lv40: 'level 40',
  eqp: 'equipped',
  uneqp: 'unequipped',
};

const tutorial = `
Hello. This Google Assistant Action is made to search the standard stats of heroes in the mobile game, Fire Emblem Heroes.
Please ask like "Tell me about Alfonse, in 5 stars, level 40 and unequipped", or just simple "Sharena".
The default hero's stats is set in 5 stars, level 1 and equipped. The stats above level 40 are not included.
Also heroes' boons and banes are available. Please ask like "Tell me Anna's boon and bane" for heroes' boons and banes information.
To finish this application, please say "cancel" or "finish".
`;

const welcome = '<speak>Which hero\'s stats do you want search?<break time="1s"/> Please ask like <break time="500ms"/> "Tell me about Alfonse in 5 stars, level 40".</speak>';

const error = 'I\'m so sorry that an error has occurred.';

const continueRes = '<speak >Who else\'s stats do you want to search?</speak>';

const ivRes = ({rarity, level, name, stats}) => `<speak>
  Here is the stats of ${rarity}, ${level}, ${name}:<break time="1s"/>
  ${stats.hp} HP,<break time="500ms"/>
  ${stats.atk} attack,<break time="500ms"/>
  ${stats.spd} speed,<break time="500ms"/>
  ${stats.def} defense,<break time="500ms"/>
  ${stats.res} resistance,
  ${stats.hp + stats.atk + stats.spd + stats.def + stats.res} in total.
</speak>`;

const boonBaneRes = ({name, variation}):string  => {
  const groupedData = divideBoonBane(variation);

  if (!Object.keys(groupedData).length)
    return `<speak>${name} has no boons or banes.</speak>`;

  let res = `${name} has `;
  if (groupedData.boon) {
    res += combineBoonBane(words, groupedData.boon, ' and ') + ' boons, ';
  } else {
    res += 'no boons, ';
  }
  res += 'and ';
  if (groupedData.bane) {
    res += combineBoonBane(words, groupedData.bane, ' and ') + ' banes.';
  } else {
    res += 'no banes.';
  }
  return `<speak>${res}</speak>`;
};

const notFoundRes = ({rarity, level, name}) => `The stats of ${rarity} ${level} ${name} if not found.`;

const commonSuggestions = ['5 stars level 40', '4 stars level 1', '3 stars level 1', 'Boon and Bane', 'Help', 'Cancel'];

export {
  words,
  tutorial,
  welcome,
  error,
  ivRes,
  notFoundRes,
  continueRes,
  boonBaneRes,
  commonSuggestions,
};
