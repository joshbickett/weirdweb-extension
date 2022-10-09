const OpenAI = require('openai-api');

const openai = new OpenAI(OPENAI_API_KEY);

export const getCompletion = async (title) => {
  console.log('title in getCompletion: ', title);
  const prompt = `Below is an array of titles and funny lists of works about the titles.
[{title: "The Office | The Show's US Website",  list: ["Bears", "Beets", "Battlestar Galactica", "Bacon"]},{title: "10 great works of literature | newliterature.com ",  list: ["To", "be", "or", "not", "to be"], {title: "javascript get environment", list:  ["get", "out", "of","my","environment"]}, {title: "${title}", list:`;
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
    var pattern = "'";
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
