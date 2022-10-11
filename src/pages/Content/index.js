import { getCompletion, getNewContent } from '../../apis/openai';
console.log('page loaded');

// create a list of sites it works on: reddit, twitter, washingtonpost, bloomberg, linkedin, google.com

const DEBUG = false;
export const changeAnchor = (element, array) => {
  if (DEBUG) console.log('element: ', element);
  if (DEBUG) console.log('array: ', array);
  const children = element?.children;

  if (DEBUG) console.log('___');
  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      changeAnchor(children[i], array);
    }
  }

  element.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const randomIndex = Math.floor(Math.random() * array.length);

    element.textContent = array[randomIndex];
  });
};

export const changeContent = (element) => {
  if (DEBUG) console.log('element: ', element);

  const children = element?.children;

  if (DEBUG) console.log('___');
  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      changeContent(children[i]);
    }
  }

  const thing = { apple: 'I am an apple', banana: 'I am a banana' };

  element.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // const newContent = await getNewContent(element.textContent);
    // console.log('new content: ', newContent);
    // element.textContent = newContent;
    // do a while loop that changes the color of the text for 5 seconds
    colorLoad(element, 0);

    // element.textContent =
  });
};

const colorLoad = (element, index) => {
  const colorArray = [
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
  ];
  element.style.color = colorArray[index];

  if (index < colorArray.length - 1) {
    setTimeout(() => {
      colorLoad(element, index + 1);
    }, 50);
  }
};

const makeWeird = async () => {
  console.log('getting completion');
  const title = document.title;
  console.log('title: ', title);
  let funnyArray = ['apples', 'and', 'bananas'];

  let results = await getCompletion(title);
  console.log('results: ', results);
  if (results?.length) {
    if (results[0]) {
      funnyArray = results;
    }
  }
  changeAnchor(document.body, funnyArray);

  changeAnchor(document.body, funnyArray);
};

const makeWeirder = async () => {
  console.log('make weirder');
  changeContent(document.body);
};

console.log('starting make weird');

makeWeirder();
