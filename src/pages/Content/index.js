import { getCompletion, getNewContent } from '../../apis/openai';
import { loadFade, loadReturn } from './loading';
import { startCursor } from './cursor';
import Robot from '../../assets/img/robot.png';
console.log('page loaded');

// create a list of sites it works on: reddit, twitter, washingtonpost, bloomberg, linkedin, google.com

const DEBUG = false;

export const changeContent = (element) => {
  if (DEBUG) console.log('element: ', element);

  const children = element?.children;

  if (DEBUG) console.log('___');
  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      changeContent(children[i]);
    }
  }

  element.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // do a while loop that changes the color of the text for 5 seconds
    loadFade(element, 0);
    const newContent = await getNewContent(element.textContent);
    console.log('new content: ', newContent);
    element.textContent = newContent;
    loadReturn(element, 0);

    // element.textContent =
  });
};

const makeWeirder = async () => {
  console.log('make weirder');
  changeContent(document.body);
};

console.log('starting make weird');

makeWeirder();

console.log('Robot', Robot);
console.log('chrome.runtime.getURL(Robot);', chrome.runtime.getURL(Robot));
const cursor = document.createElement('img');
cursor.id = 'follow-me';
cursor.src = chrome.runtime.getURL(Robot);
document.body.appendChild(cursor);

startCursor();
