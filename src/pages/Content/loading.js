export const loadFade = (element, index) => {
  // create an array that goes through the rainbow
  const fadeColor = [
    '#000000',
    '#000b0f',
    '#00171f',
    '#00232e',
    '#002f3e',
    '#003b4e',
    '#00475d',
    '#00536d',
    '#005f7c',
    '#006b8c',
    '#00779c',
    '#1a84a5',
    '#338fad',
    '#4d9cb6',
    '#66a9bf',
    '#80b6c8',
    '#99c3d1',
    '#b3d0da',
    '#cce0e3',
    '#e5edec',
    '#ffffff',
  ];

  element.style.color = fadeColor[index];

  if (index < fadeColor.length - 1) {
    setTimeout(() => {
      loadFade(element, index + 1);
    }, 50);
  }
};

export const loadReturn = (element, index) => {
  const returnColor = [
    '#e5edec',
    '#cce0e3',
    '#b3d0da',
    '#99c3d1',
    '#80b6c8',
    '#66a9bf',
    '#4d9cb6',
    '#338fad',
    '#1a84a5',
    '#00779c',
    '#006b8c',
    '#005f7c',
    '#00536d',
    '#00475d',
    '#003b4e',
    '#002f3e',
    '#00232e',
    '#00171f',
    '#000b0f',
    '#000000',
  ];
  element.style.color = returnColor[index];

  if (index < returnColor.length - 1) {
    setTimeout(() => {
      loadReturn(element, index + 1);
    }, 50);
  }
};
