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
let winningElement = 0;
let endNodesCount = 0;
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
    console.log('count', count);
    let winner = false;

    if (count === winningElement) {
      let winnerOk = checkWinner(element);
      if (winnerOk) {
        console.log('winning element');
        console.log('element', element);
        winner = true;
        element.id = 'winner';
      } else {
        console.log('winner is not ok');
        console.log('winningElement', winningElement);
        console.log('endNodesCount', endNodesCount);
        if (winningElement < endNodesCount) {
          winningElement++;
        } else {
          console.log('no winner!');
        }
      }
    }
    count++;
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
              await handleImage(element, winner);
              break;
            default:
              await handleText(element, winner);
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

const countEndNodes = () => {
  let count = 0;
  const elements = document.body.getElementsByTagName('*');
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].children.length === 0) {
      count++;
    }
  }
  console.log('countEndNodes()', count);
  return count;
};

const handleImage = async (element, winner) => {
  const alt = element.alt;
  if (winner) {
    const newSrc = await getImage('winner');
    element.src = newSrc;
    // redirect to winning link
    setTimeout(() => {
      window.location.href = winningLink;
    }, 3000);
  } else if (alt) {
    const newSrc = await getImage(alt);

    element.src = newSrc;
  } else {
    if (DEBUG_LISTENER) console.log('eventListener: No alt text on image');
  }
};

const handleText = async (element, winner) => {
  if (winner) {
    element.innerHTML = 'WINNER 👾';
    setTimeout(() => {
      window.location.href = winningLink;
    }, 3000);
  } else {
    const newContent = randomCaps(element.textContent);
    console.log('newContent', newContent);

    element.textContent = newContent;
  }
};

const handleBody = async () => {
  if (DEBUG_LISTENER) console.log('eventListener: handleBody()');
  const newBackground = await getBackground();

  document.body.style.backgroundImage = `url(${newBackground})`;
};

const makeWeird = async () => {
  chrome.storage.local.get(['enabled'], (result) => {
    if (DEBUG_GENERAL) console.log('makeWeird() result', result);
    if (result?.enabled) {
      if (DEBUG_GENERAL) console.log('makeWeird() enabled');

      endNodesCount = countEndNodes();

      winningElement = Math.floor(Math.random() * endNodesCount);
      if (DEBUG_GENERAL) console.log('winningElement', winningElement);

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

const checkWinner = (element) => {
  let elementOk = true;
  if (
    [
      'SCRIPT',
      'STYLE',
      'LINK',
      'META',
      'TITLE',
      'HEAD',
      'HTML',
      'BODY',
      'NOSCRIPT',
      'IFRAME',
    ].includes(element.nodeName)
  ) {
    elementOk = false;
  }
  if (element.textContent.trim() === '') {
    elementOk = false;
  }
  return elementOk;
};

makeWeird();
