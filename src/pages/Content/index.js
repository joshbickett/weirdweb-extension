import { getCompletion, getNewContent } from '../../apis/api';
import { loadFadeWait, loadFade, loadReturn } from './loading';
import { startCursor } from './cursor';
import Robot from '../../assets/img/robot.png';
import { getImage } from '../../apis/api';
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

    if (element.nodeName === 'IMG') {
      await loadFadeWait(element, 0);

      const alt = element.alt;

      if (alt) {
        const newSrc = await getImage(alt);

        element.src = newSrc;
      } else {
        console.log('no alt');
      }
    } else {
      loadFade(element, 0);
      const newContent = await getNewContent(element.textContent);

      element.textContent = newContent;
    }

    await loadReturn(element, 0);
  });
};

const makeWeird = async () => {
  changeContent(document.body);
};

console.log('starting make weird');

makeWeird();

const cursor = document.createElement('img');
cursor.id = 'follow-me';
cursor.src = chrome.runtime.getURL(Robot);
document.body.appendChild(cursor);

startCursor();
