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
  const group = Object.entries(variation).reduce((root, item) => {
    let groupKey;
    switch (item[1]) {
      case 1:
        groupKey = 'boon';
        break;
      case -1:
        groupKey = 'bane';
        break;
    }
    if (!groupKey) return root;

    if (!root[groupKey]) root[groupKey] = [];
    root[groupKey].push(item[0]);
    return root;
  }, {});
  return group;
};

export const combineBoonBane = (dict: object, keys: string[], conjunction: string): string => {
  return keys.map(key => dict[key]).join(conjunction);
};
