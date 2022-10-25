import { handleClick } from './cursor';
import { loadFadeWait, loadFade, loadReturn } from './loading';
import { startCursor } from './cursor';
import Robot from '../../assets/img/robot.png';
import { getImage, getBackground } from '../../apis/api';
import { randomCaps } from './random';

console.log('page loaded');

const winningLink =
  'https://band-danger-251.notion.site/Weirdweb-ai-959d4e8462fa45af9c74a31f92569789';

const DEBUG_GENERAL = true;

const noClicking = (e) => {
  if (DEBUG_GENERAL) console.log('noClicking()');
  e.preventDefault();
  e.stopPropagation();
};

const DEBUG_CHANGE = false;
const DEBUG_LISTENER = true;
let count = 0;
const changeContent = async (element, winningElement) => {
  if (DEBUG_CHANGE) console.log('element: ', element);
  // console.log('________');
  // console.log('element: ', element);
  // console.log('winningElement', winningElement);
  console.log('count', count);
  count++;

  const children = element?.children;
  element.addEventListener('mousedown', noClicking);
  element.addEventListener('mouseup', noClicking);

  if (DEBUG_CHANGE) console.log('___');
  if (children.length > 0) {
    element.addEventListener('click', noClicking);
    for (let i = 0; i < children.length; i++) {
      await changeContent(children[i], winningElement);
    }
  } else {
    element.addEventListener('click', async (e) => {
      chrome.storage.local.get(['enabled'], async (result) => {
        if (result?.enabled) {
          if (DEBUG_LISTENER) console.log('eventListener: fired e =>', e);
          handleClick();
          e.preventDefault();
          e.stopPropagation();
          if (DEBUG_LISTENER) console.log('e.target', e.target);
          const element = e.target;

          if (DEBUG_LISTENER)
            console.log('eventListener: element.nodeName =>', element.nodeName);

          await loadFadeWait(element, 0);
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
        } else {
          if (DEBUG_GENERAL) console.log('makeWeird() onclick disabled');
        }
      });
    });
  }
};

const countElementsOnPage = () => {
  const elements = document.getElementsByTagName('*');
  const scriptCount = document.getElementsByTagName('script').length;
  const styleCount = document.getElementsByTagName('style').length;
  const linkCount = document.getElementsByTagName('link').length;
  const noScriptCount = document.getElementsByTagName('noscript').length;
  const metaCount = document.getElementsByTagName('meta').length;
  const titleCount = document.getElementsByTagName('title').length;

  const elementCount = elements.length;
  console.log('elements count ', elementCount);
  console.log('script count ', scriptCount);
  console.log('style count ', styleCount);
  console.log('link count ', linkCount);
  const cleanElementCount =
    elementCount -
    scriptCount -
    styleCount -
    linkCount -
    noScriptCount -
    metaCount -
    titleCount;

  if (DEBUG_GENERAL)
    console.log('countElementsOnPage() count: ', cleanElementCount);
  return cleanElementCount;
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
  // chrome.storage.local.set({ enabled: e.target.checked });
  console.log('getting from storage');
  chrome.storage.local.get(['enabled'], (result) => {
    console.log('makeWeird() result', result);
    if (result?.enabled) {
      if (DEBUG_GENERAL) console.log('makeWeird() enabled');

      const elementCount = countElementsOnPage();
      // get random number between 0 and elementCount
      const winningElement = Math.floor(Math.random() * elementCount);
      console.log('winningElement', winningElement, 0);

      changeContent(document.body, winningElement, 0);
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

      if (DEBUG_GENERAL) console.log('appending cursor');
      const cursor = document.createElement('img');
      cursor.id = 'follow-me';
      cursor.src = chrome.runtime.getURL(Robot);
      document.body.appendChild(cursor);

      startCursor();
      // append content.styles.css to the head
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = chrome.runtime.getURL('content.styles.css');
      document.head.appendChild(style);
    } else {
      if (DEBUG_GENERAL) console.log('makeWeird() disabled');
    }
  });
};

makeWeird();
