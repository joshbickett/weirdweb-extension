import { handleClick } from './cursor';
import { loadFadeWait, loadFade, loadReturn } from './loading';
import { startCursor } from './cursor';
import Robot from '../../assets/img/robot.png';
import { getImage, getBackground } from '../../apis/api';
import { randomCaps } from './random';

console.log('page loaded');

const winningLink =
  'https://band-danger-251.notion.site/Weirdweb-ai-959d4e8462fa45af9c74a31f92569789';
const winningDisplayImage =
  'https://lexica-serve-encoded-images.sharif.workers.dev/md/02d25547-5372-4e7d-accd-aff511bf0b40';

const DEBUG = true;
let index = 0;
let winningImageIndex = 0;
let imageCount = 0;
const updateImages = async (element) => {
  const children = element?.children;
  element.addEventListener('mousedown', noClicking);
  element.addEventListener('mouseup', noClicking);
  element.addEventListener('click', noClicking);

  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      await updateImages(children[i]);
    }
  } else {
    if (element.nodeName !== 'IMG') return;

    let winner = false;

    if (DEBUG) console.log('index', index);
    if (DEBUG) console.log('winningImageIndex', winningImageIndex);

    if (index === winningImageIndex) {
      let winnerOk = checkWinner(element);

      if (winnerOk) {
        if (DEBUG) console.log('wining element', element);
        winner = true;
        element.id = 'winner';
        makeWinnerAIImage(element);
      } else {
        if (DEBUG) console.log('winner is not ok');
        if (DEBUG) console.log('winningElement', winningImageIndex);
        if (winningImageIndex < imageCount) {
          winningImageIndex++;
        } else {
          console.log('AUTOMATIC WINNER!');
        }
      }
    }
    index++;
    element.addEventListener('click', async (e) => {
      chrome.storage.local.get(['enabled'], async (result) => {
        if (result?.enabled) {
          if (DEBUG) console.log('eventListener: fired e =>', e);
          handleClick();
          e.preventDefault();
          e.stopPropagation();
          if (DEBUG) console.log('e.target', e.target);
          const element = e.target;

          await loadFadeWait(element, 0);

          await handleImageClick(element, winner);

          await loadReturn(element, 0);
        } else {
          if (DEBUG) console.log('makeWeird() onclick disabled');
        }
      });
    });
  }
};

const makeWinnerAIImage = async (element) => {
  const alt = element.alt;
  const newSrc = await getImage(alt);
  element.src = newSrc;
  element.srcset = newSrc;
};

const countImages = () => {
  let count = 0;
  const images = document.body.getElementsByTagName('IMG');
  for (let i = 0; i < images.length; i++) {
    count++;
  }
  console.log('countImages()', count);
  return count;
};

const handleImageClick = async (element, winner) => {
  const alt = element.alt;
  if (winner) {
    const newSrc = await getImage('winner');
    console.log('newSrc', newSrc);
    element.src = winningDisplayImage;
    element.srcset = winningDisplayImage;

    setTimeout(() => {
      window.location.href = winningLink;
    }, 3000);
  } else if (alt) {
    try {
      console.log('alt', alt);
      const newSrc = await getImage(alt);

      element.src = newSrc;

      element.srcset = newSrc;
    } catch {
      console.log('error in handleImage()');
      const newSrc = await getImage('error');
      element.src = newSrc;

      element.srcset = newSrc;
    }
  } else {
    if (DEBUG) console.log('eventListener: No alt text on image');
    const newSrc = await getImage('futuristic');
    element.src = newSrc;

    element.srcset = newSrc;
  }
};
const noClicking = (e) => {
  if (DEBUG) console.log('noClicking()');
  e.preventDefault();
  e.stopPropagation();
};

const makeWeird = async () => {
  chrome.storage.local.get(['enabled'], (result) => {
    if (DEBUG) console.log('makeWeird() result', result);
    if (result?.enabled) {
      if (DEBUG) console.log('makeWeird() enabled');

      imageCount = countImages();

      winningImageIndex = Math.floor(Math.random() * imageCount);
      if (DEBUG) console.log('winningElement', winningImageIndex);

      updateImages(document.body);

      if (DEBUG) console.log('appending cursor');
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
      if (DEBUG) console.log('makeWeird() disabled');
    }
  });
};

const DEBUG_WINNER = true;
const checkWinner = (element) => {
  let elementOk = true;
  if (DEBUG_WINNER) console.log('style.display', element.style.display);
  if (element.src.includes('data:image/gif')) elementOk = false;
  return elementOk;
};

makeWeird();
