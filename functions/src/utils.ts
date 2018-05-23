import * as reduce from 'lodash.reduce';

interface StatsVariation {
  hp: number;
  atk: number;
  speed: number;
  def: number;
  res: number;
}

interface BoonBaneGroup {
  boon?: string[];
  bane?: string[];
}

// n = {hp: 0, atk: 0, spd: 0, def: 0, res: 0}
export const divideBoonBane = (variation: StatsVariation): BoonBaneGroup => {
  return reduce(variation, (group, val, key) => {
    let groupKey;
    switch (val) {
      case 1:
        groupKey = 'boon';
        break;
      case -1:
        groupKey = 'bane';
        break;
    }
    if (!groupKey) return group;

    if (!group[groupKey]) group[groupKey] = [];
    group[groupKey].push(key);
    return group;
  }, {});
};

export const combineBoonBane = (dict: object, keys: string[], conjunction: string): string => {
  return keys.map(key => dict[key]).join(conjunction);
};
