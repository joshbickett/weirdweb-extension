let originalColor = '#000000';

export const loadFadeWait = async (element, index) => {
  originalColor = element.style.color;
  return new Promise((resolve, reject) => {
    const fade = (el, i) => {
      if (el.nodeName === 'IMG') {
        const opacityArr = [
          1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4,
          0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0,
        ];
        const opacity = opacityArr[i];

        el.style.opacity = opacity;
        if (i < opacityArr.length - 1) {
          setTimeout(() => {
            fade(el, i + 1);
          }, 25);
        } else {
          resolve();
        }
      } else {
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

        el.style.color = fadeColor[i];

        if (i < fadeColor.length - 1) {
          setTimeout(() => {
            fade(el, i + 1);
          }, 25);
        } else {
          resolve();
        }
      }
    };
    fade(element, index);
  });
};

export const loadFade = async (element, index) => {
  originalColor = element.style.color;
  const fade = (el, i) => {
    if (el.nodeName === 'IMG') {
      const opacityArr = [
        1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4,
        0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0,
      ];
      const opacity = opacityArr[i];

      el.style.opacity = opacity;
      if (i < opacityArr.length - 1) {
        setTimeout(() => {
          fade(el, i + 1);
        }, 50);
      }
    } else {
      // create an array that goes through the rainbow
      let fadeColor = [
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

      el.style.color = fadeColor[i];

      if (i < fadeColor.length - 1) {
        setTimeout(() => {
          fade(el, i + 1);
        }, 25);
      }
    }
  };
  fade(element, index);
};

export const loadReturn = async (element, index) => {
  return new Promise((resolve, reject) => {
    const returnCo = (el, i) => {
      if (el.nodeName === 'IMG') {
        const opacityArr = [
          0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
          0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
        ];

        const opacity = opacityArr[i];
        el.style.opacity = opacity;

        if (i < opacityArr.length - 1) {
          setTimeout(() => {
            loadReturn(el, i + 1);
          }, 25);
        } else {
          resolve();
        }
      } else {
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

        returnColor.push(originalColor);
        el.style.color = returnColor[i];

        if (i < returnColor.length - 1) {
          setTimeout(() => {
            returnCo(el, i + 1);
          }, 75);
        } else {
          resolve();
        }
      }
    };
    returnCo(element, index);
  });
};
