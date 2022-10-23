import { getKey } from './secrets.key';
import { getErrorImage } from '../pages/Content/error';
import {
  getFunnyPrompt,
  getLetterChangePrompt,
} from '../pages/Content/prompts';
const OpenAI = require('openai-api');
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// console.log('open api key', OPENAI_API_KEY);
const OPENAI_API_KEY = getKey();

const openai = new OpenAI(OPENAI_API_KEY);

const DEBUG = false;

export const getNewContent = async (text) => {
  const cleanText = text.replace(/[^a-zA-Z ]/g, '');

  const letterChangePrompt = getLetterChangePrompt(cleanText);
  try {
    const gptResponse = await openai.complete({
      engine: 'davinci',
      prompt: letterChangePrompt,
      maxTokens: 150,
      temperature: 0.9,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ['}'],
    });
    const response = gptResponse.data;
    if (DEBUG) console.log('response: ', response);
    if (response?.choices?.length > 0) {
      // funnyArray = results.choices[0].text;
      if (DEBUG) console.log('returning: ', response.choices[0].text);
      // remove [ and ] from the response
      const cleanResponse = response?.choices[0].text;
      var pattern = '"';
      let re = new RegExp(pattern, 'g');
      const arrayResults = cleanResponse
        .replace('[', '')
        .replace(']', '')
        .replace(re, '');
      if (DEBUG) console.log('array results', arrayResults);
      return arrayResults.split(',');
    }
  } catch (e) {
    console.log('e', e);
    return [];
  }
};

export const getTurtleContent = async (text) => {
  const cleanText = text.replace(/[^a-zA-Z ]/g, '');

  const letterChangePrompt = `The following changes the original text to funny text about turtles: 
[
  {original: "Jimmy John", funnyEdited: "Jimmy Turtle"}, 
  {original: "A database without dynamic memory allocation ", funnyEdited: "A database without dynamic TURTLES"}"} 
  {original: "The best way to buy the products you love.", funnyEdited: "Products are just Turtles"} 
  {original: "Billionaire Bankman-Fried Tries to Fix Crypto’s Hacking Problem", funnyEdited: "Billionaire Bankman-Fried buys 10,000 turtles"}
  {original: "Markets Calling: Forget It, Tories, You Can Go It Alone", funnyEdited: "Markets calling: We need more turtles"}
  {original: "${cleanText}", funnyEdited:`;
  try {
    const gptResponse = await openai.complete({
      engine: 'davinci',
      prompt: letterChangePrompt,
      maxTokens: 150,
      temperature: 0.9,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ['}'],
    });
    const response = gptResponse.data;
    if (DEBUG) console.log('response: ', response);
    if (response?.choices?.length > 0) {
      // funnyArray = results.choices[0].text;
      if (DEBUG) console.log('returning: ', response.choices[0].text);
      // remove [ and ] from the response
      const cleanResponse = response?.choices[0].text;
      var pattern = '"';
      let re = new RegExp(pattern, 'g');
      const arrayResults = cleanResponse
        .replace('[', '')
        .replace(']', '')
        .replace(re, '');
      if (DEBUG) console.log('array results', arrayResults);
      return arrayResults.split(',');
    }
  } catch (e) {
    console.log('e', e);
    return [];
  }
};

export const getBackground = async () => {
  const response = await fetch(
    `https://lexica.art/api/v1/search?q=simple color`
  );
  const data = await response.json();
  if (DEBUG) console.log('data', data);
  const images = data.images;
  return selectAtRandom(images, 0);
};

export const getTurtleBackground = async () => {
  console.log('get turtle background');
  const response = await fetch(
    `https://lexica.art/api/v1/search?q=simple turtle image`
  );
  const data = await response.json();
  if (DEBUG) console.log('data', data);
  const images = data.images;
  return selectAtRandom(images, 0);
};

export const getImage = async (search) => {
  // make a GET request to the following endpoint => https://lexica.art/api/v1/search?q=apples
  const url = `https://lexica.art/api/v1/search?q=${search}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log('data', data);
  const images = data.images;
  return selectAtRandom(images, 0);
};

export const getTurtleImage = async (search) => {
  // make a GET request to the following endpoint => https://lexica.art/api/v1/search?q=apples
  const url = `https://lexica.art/api/v1/search?q=${search} and include turtles`;

  const response = await fetch(url);
  const data = await response.json();
  console.log('data', data);
  const images = data.images;
  return selectAtRandom(images, 0);
};

const selectAtRandom = (array, tries) => {
  const randomImage = array[Math.floor(Math.random() * array.length)];
  if (randomImage.nsfw === true && tries < 25) {
    selectAtRandom(array, tries + 1);
  } else if (tries >= 25) {
    return getErrorImage();
  } else {
    return randomImage.src;
  }
};
