export const MISSION_STAT_TYPES = {
  NUMBER: 'number',
  PERCENTAGE: 'percentage',
  CURRENCY: 'currency', // Example
};

// Define formatting rules based on type
export const formatMissionStatValue = (value: number, type: string) => {
  switch (type) {
    case MISSION_STAT_TYPES.NUMBER:
      if (value >= 1000000) {
        return { displayValue: (value / 1000000).toFixed(1).replace(/\.0$/, ''), suffix: 'M' };
      } else if (value >= 1000) {
        return { displayValue: (value / 1000).toFixed(1).replace(/\.0$/, ''), suffix: 'K' };
      }
      return { displayValue: value, suffix: '' };
    case MISSION_STAT_TYPES.PERCENTAGE:
      return { displayValue: value, suffix: '%' };
    case MISSION_STAT_TYPES.CURRENCY:
      return { displayValue: value, suffix: '$' };
    default:
      return { displayValue: value, suffix: '' };
  }
}; 