export const randomCaps = (original) => {
  // turn into a string with random caps like 'hElLo wOrLd'
  const randomCaps = original.split('').map((char) => {
    return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
  });
  return randomCaps.join('');
};
