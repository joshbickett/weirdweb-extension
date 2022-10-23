import { handleClick } from './cursor';
import { loadFadeWait, loadFade, loadReturn } from './loading';
import { startCursor } from './cursor';
import Robot from '../../assets/img/robot.png';
import { getImage, getBackground } from '../../apis/api';
import { randomCaps } from './random';

console.log('page loaded');

// create a list of sites it works on: reddit, twitter, washingtonpost, bloomberg, linkedin, google.com

const DEBUG_GENERAL = false;

const noClicking = (e) => {
  if (DEBUG_GENERAL) console.log('noClicking()');
  e.preventDefault();
  e.stopPropagation();
};

const DEBUG_CHANGE = false;
const DEBUG_LISTENER = true;
const changeContent = async (element) => {
  if (DEBUG_CHANGE) console.log('element: ', element);

  const children = element?.children;
  element.addEventListener('mousedown', noClicking);
  element.addEventListener('mouseup', noClicking);

  if (DEBUG_CHANGE) console.log('___');
  if (children.length > 0) {
    element.addEventListener('click', noClicking);
    for (let i = 0; i < children.length; i++) {
      await changeContent(children[i]);
    }
  } else {
    element.addEventListener('click', async (e) => {
      if (DEBUG_LISTENER) console.log('eventListener: fired e =>', e);
      handleClick();
      e.preventDefault();
      e.stopPropagation();
      if (DEBUG_LISTENER) console.log('e.target', e.target);
      const element = e.target;

      if (DEBUG_LISTENER)
        console.log('eventListener: element.nodeName =>', element.nodeName);

      // await loadFadeWait(element, 0);
      switch (element.nodeName) {
        case 'IMG':
          await handleImage(element);
          break;
        case 'BODY':
          await handleBody();
          break;
        default:
          await handleText(element);
          break;
      }
      await loadReturn(element, 0);
    });
  }
};

const handleImage = async (element) => {
  const alt = element.alt;
  if (alt) {
    const newSrc = await getImage(alt);

    element.src = newSrc;
  } else {
    if (DEBUG_LISTENER) console.log('eventListener: No alt text on image');
  }
};

const handleText = async (element) => {
  loadFade(element, 0);
  const newContent = randomCaps(element.textContent);
  console.log('newContent', newContent);

  element.textContent = newContent;
};

const handleBody = async () => {
  if (DEBUG_LISTENER) console.log('eventListener: handleBody()');
  const newBackground = await getBackground();

  document.body.style.backgroundImage = `url(${newBackground})`;
};

const makeWeird = async () => {
  if (DEBUG_GENERAL) console.log('makeWeird()');

  changeContent(document.body);
  document.body.addEventListener('click', async (e) => {
    if (DEBUG_LISTENER) console.log('eventListener: fired e =>', e);
    handleClick();
    e.preventDefault();
    e.stopPropagation();
    if (DEBUG_LISTENER) console.log('e.target', e.target);
    const element = e.target;

    if (DEBUG_LISTENER)
      console.log('eventListener: element.nodeName =>', element.nodeName);

    if (element.nodeName === 'BODY') {
      handleBody();
    }
  });
};

makeWeird();

const cursor = document.createElement('img');
cursor.id = 'follow-me';
cursor.src = chrome.runtime.getURL(Robot);
document.body.appendChild(cursor);

startCursor();
