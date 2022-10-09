const OpenAI = require('openai-api');
const OPENAI_API_KEY = '';

const openai = new OpenAI(OPENAI_API_KEY);

export const getCompletion = async (url, title, text) => {
  console.log('title in getCompletion: ', title);
  const prompt = `Below are arrays of length 4 with funny text. 

   ###
   ['Bananas', 'Fly to the moon', 'memes!!!', 'Weird stuff!']
   ###
   ['Bears', 'Beets', 'Battlestar Galactica', 'Bacon']
   ###
   ['To', 'be', 'or', 'not', 'to', 'be']`;
  console.log('prompt:', prompt);
  const gptResponse = await openai.complete({
    engine: 'davinci',
    prompt: prompt,
    maxTokens: 100,
    temperature: 0.9,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
    stop: ['###'],
  });

  return gptResponse.data;
};
