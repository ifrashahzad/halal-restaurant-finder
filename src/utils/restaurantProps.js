import bigBiteImg from '../assets/big-bite.webp';
import qazanImg from '../assets/qazan.webp';

export function getSeededProps(name) {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const random = Math.abs(Math.sin(hash));

  const rating = (4.2 + (random * 0.7)).toFixed(1);
  const reviewsCount = Math.floor(40 + (random * 300));
  const distanceFake = (1.2 + (random * 4.5)).toFixed(1);

  const tagOptions = ['DINING', 'FAMILY', 'CASUAL', 'STREET FOOD'];
  const tag = tagOptions[Math.floor(random * tagOptions.length)];

  const prefixOpts = ['Authentic', 'Traditional', 'Finest'];
  const prefix = prefixOpts[Math.floor(random * prefixOpts.length)];
  const isSpecialty = random > 0.5;

  return { rating, reviewsCount, distanceFake, tag, prefix, isSpecialty };
}

export function getDisplayDesc(cuisine, prefix, isSpecialty) {
  if (!cuisine) return 'Various Cuisines';
  return isSpecialty ? `${cuisine} Specialty` : `${prefix} ${cuisine} Cuisine`;
}

export function getImageUrl(restaurant, size = '400x200') {
  const nameLower = (restaurant.name || '').toLowerCase();
  if (nameLower.includes('big bite')) return bigBiteImg;
  if (nameLower.includes('qazan')) return qazanImg;
  return `https://source.unsplash.com/${size}/?halal,food,${encodeURIComponent(restaurant.cuisine || 'food')}&sig=${(restaurant.name || '').length}`;
}
