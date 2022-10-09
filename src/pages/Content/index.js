import { getCompletion } from '../../apis/openai';
console.log('page loaded');

const DEBUG = true;
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
    const randomIndex = Math.floor(Math.random() * array.length);
    if (element.nodeName === 'A') {
      element.textContent = array[randomIndex];
    }
  });
};

setTimeout(() => {
  console.log('changing anchor tags');
  makeWeird();
}, 2);

const makeWeird = async () => {
  console.log('getting completion');
  const title = document.title;
  console.log('title: ', title);
  let funnyArray = ['apples', 'and', 'bananas'];
  try {
    let results = await getCompletion(title);
    console.log('results: ', results);
    if (results?.length) {
      if (results[0]) {
        funnyArray = results;
      }
    }
    changeAnchor(document.body, funnyArray);
  } catch (e) {
    console.log('error: ', e);
    changeAnchor(document.body, funnyArray);
  }
};
