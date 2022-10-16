import { getKey } from './secrets.key';
import { getErrorImage } from '../pages/Content/error';
const OpenAI = require('openai-api');
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// console.log('open api key', OPENAI_API_KEY);
const OPENAI_API_KEY = getKey();

const openai = new OpenAI(OPENAI_API_KEY);

export const getCompletion = async (title) => {
  console.log('title in getCompletion: ', title);
  const prompt = `Below are webpage, their titles, and funny lists that expose what the web page wants from the user.
[{title: "The Office | The Show's US Website", url: 'https://www.theofficeshow.com/' list: ["Bears", "Beets", "Battlestar Galactica", "Bacon"]},{title: "10 great works of literature | newliterature.com ", url: "https://www.newliterature.com/". list: ["To", "be", "or", "not", "to be"], {title: "New York Times articles", url: "https://www.nytimes.com/", list:  ["subscribe", "please", "subscribe", "please"]}, {title: "${title}", list:`;
  console.log('prompt:', prompt);
  const gptResponse = await openai.complete({
    engine: 'davinci',
    prompt: prompt,
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
  console.log('response: ', response);
  if (response?.choices?.length > 0) {
    // funnyArray = results.choices[0].text;
    console.log('returning: ', response.choices[0].text);
    // remove [ and ] from the response
    const cleanResponse = response?.choices[0].text;
    var pattern = '"';
    let re = new RegExp(pattern, 'g');
    const arrayResults = cleanResponse
      .replace('[', '')
      .replace(']', '')
      .replace(re, '');
    console.log('array results', arrayResults);

    return arrayResults.split(',');
  } else {
    return [];
  }
};

export const getNewContent = async (text) => {
  const cleanText = text.replace(/[^a-zA-Z ]/g, '');
  const prompt = `The following is a list of funny changes to phrases, keep it short: 
[
  {original: "Jimmy John", funnyEdited: "JiMMY JoHN JimMy"}, 
  {original: "A database without dynamic memory allocation ", funnyEdited: "The database is wearing a taco hat"} 
  {original: "Hot Inflation Torches Bears in a Stock Reversal for the Ages", funnyEdited: "Bears fight inflation by eating less fish"} 
  {original: "Albert Pickle", funnyEdited: "aLBErt PiCkle"},
  {original: "As US Mortgage Rates Near 7%, a Warning They Could Go Much Higher", funnyEdited: "As US Mortgage Rates Near 7000%"} 
  {original: "comments", funnyEdited: "1209120398 comments"} 
  {original: "Kroger Wants to Merge With Albertsons to Create US Grocery Giant", funnyEdited: "Kroger and Albertsons create a super sized robot!"} 
  {original: "Code Review Handbook ", funnyEdited: "Why not to code"} 
  {original: "${cleanText}", funnyEdited:`;
  console.log('prompt: ', prompt);

  const letterChangePrompt = `The following changes the original text to funny text: 
[
  {original: "Jimmy John", funnyEdited: "JiMMY JoHN"}, 
  {original: "A database without dynamic memory allocation ", funnyEdited: "a dATaBaSE WIthOut dYnaMIC mEMORy ALloCaTIon"} 
  {original: "The best way to buy the products you love.", funnyEdited: "ThE beST WAy tO BUy THe pROdUCtS YOu lOVe."} 
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
    console.log('response: ', response);
    if (response?.choices?.length > 0) {
      // funnyArray = results.choices[0].text;
      console.log('returning: ', response.choices[0].text);
      // remove [ and ] from the response
      const cleanResponse = response?.choices[0].text;
      var pattern = '"';
      let re = new RegExp(pattern, 'g');
      const arrayResults = cleanResponse
        .replace('[', '')
        .replace(']', '')
        .replace(re, '');
      console.log('array results', arrayResults);
      return arrayResults.split(',');
    }
  } catch (e) {
    console.log('e', e);
    return [];
  }
};

export const getImage = async (search) => {
  // make a GET request to the following endpoint => https://lexica.art/api/v1/search?q=apples

  const response = await fetch(`https://lexica.art/api/v1/search?q=${search}`);
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
