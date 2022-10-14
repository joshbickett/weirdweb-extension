import { getKey } from './secrets.key';
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
  const prompt = `The following is a list of funny changes to phrases, keep it short: [{original: "Jimmy John", funnyEdited: "JiMMY JoHN JimMy"}, { original: ${text},  edit:`;
  console.log('prompt: ', prompt);
  try {
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
    }
  } catch (e) {
    console.log('e', e);
    return [];
  }
};