import { getCompletion, getNewContent } from '../../apis/api';
import { loadFadeWait, loadFade, loadReturn } from './loading';
import { startCursor } from './cursor';
import Robot from '../../assets/img/robot.png';
import { getImage, getBackground } from '../../apis/api';
console.log('page loaded');

// create a list of sites it works on: reddit, twitter, washingtonpost, bloomberg, linkedin, google.com

const DEBUG = true;

const noClicking = (e) => {
  console.log("You're not supposed to click on anything!");
  e.preventDefault();
  e.stopPropagation();
};

const changeContent = (element) => {
  if (DEBUG) console.log('element: ', element);

  const children = element?.children;

  if (DEBUG) console.log('___');
  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      changeContent(children[i]);
    }
  }

  element.addEventListener('mousedown', noClicking);
  element.addEventListener('mouseup', noClicking);
  element.addEventListener('click', async (e) => {
    if (DEBUG) console.log('eventListener: fired e =>', e);
    e.preventDefault();
    e.stopPropagation();
    console.log('e.target', e.target);
    const element = e.target;

    if (DEBUG)
      console.log('eventListener: element.nodeName =>', element.nodeName);

    switch (element.nodeName) {
      case 'IMG':
        handleImage(element);
        break;
      case 'BODY':
        handleBody();
        break;
      default:
        handleText(element);
        break;
    }

    await loadReturn(element, 0);
  });
};

const changeContentOld = async () => {
  document.addEventListener('click', async (e) => {
    if (DEBUG) console.log('eventListener: fired e =>', e);
    e.preventDefault();
    e.stopPropagation();
    console.log('e.target', e.target);
    const element = e.target;

    if (DEBUG)
      console.log('eventListener: element.nodeName =>', element.nodeName);

    switch (element.nodeName) {
      case 'IMG':
        handleImage(element);
        break;
      case 'BODY':
        handleBody();
        break;
      default:
        handleText(element);
        break;
    }

    await loadReturn(element, 0);
  });
};

const handleImage = async (element) => {
  await loadFadeWait(element, 0);
  const alt = element.alt;
  if (alt) {
    const newSrc = await getImage(alt);
    element.src = newSrc;
  } else {
    if (DEBUG) console.log('eventListener: No alt text on image');
  }
};

const handleText = async (element) => {
  loadFade(element, 0);
  const newContent = await getNewContent(element.textContent);
  element.textContent = newContent;
};

const handleBody = async () => {
  if (DEBUG) console.log('eventListener: handleBody()');
  const newBackground = await getBackground();
  console.log('newBackground', newBackground);
  document.body.style.backgroundImage = `url(${newBackground})`;
};

const makeWeird = async () => {
  if (DEBUG) console.log('makeWeird2()');

  changeContent(document.body);
};

makeWeird();

const cursor = document.createElement('img');
cursor.id = 'follow-me';
cursor.src = chrome.runtime.getURL(Robot);
document.body.appendChild(cursor);

startCursor();
