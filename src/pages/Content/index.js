import { getCompletion, getNewContent } from '../../apis/openai';
console.log('page loaded');

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

  const thing = { apple: 'I am an apple', banana: 'I am a banana' };

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
    const newContent = await getNewContent(element.textContent);
    console.log('new content: ', newContent);
    element.textContent = newContent;

    // element.textContent =
  });
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
