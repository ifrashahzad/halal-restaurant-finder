export const CUISINE_COLORS = {
  'Turkish': '#e63946',
  'Arab': '#f4a261',
  'Pakistani': '#2a9d8f',
  'Indian': '#e9c46a',
  'Somali': '#264653',
  'Levantine': '#7b2d8b',
  'Middle Eastern': '#d62828',
  'Bangladeshi': '#457b9d',
  'Syrian': '#e07a5f',
  'Other': '#6d6875'
};

export function getPinColor(cuisine) {
  return CUISINE_COLORS[cuisine] || CUISINE_COLORS['Other'];
}
