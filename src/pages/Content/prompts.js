export const getLetterChangePrompt = (cleanText) => {
  const prompt = `The following changes the original text to funny text: 
  [
    {original: "Jimmy John", funnyEdited: "JiMMY JoHN"}, 
    {original: "A database without dynamic memory allocation ", funnyEdited: "a dATaBaSE WIthOut dYnaMIC mEMORy ALloCaTIon"} 
    {original: "The best way to buy the products you love.", funnyEdited: "ThE beST WAy tO BUy THe pROdUCtS YOu lOVe."} 
    {original: "${cleanText}", funnyEdited:`;
  return prompt;
};

export const getFunnyPrompt = (title) => {
  const prompt = `Below are webpage, their titles, and funny lists that expose what the web page wants from the user.
  [{title: "The Office | The Show's US Website", url: 'https://www.theofficeshow.com/' list: ["Bears", "Beets", "Battlestar Galactica", "Bacon"]},{title: "10 great works of literature | newliterature.com ", url: "https://www.newliterature.com/". list: ["To", "be", "or", "not", "to be"], {title: "New York Times articles", url: "https://www.nytimes.com/", list:  ["subscribe", "please", "subscribe", "please"]}, {title: "${title}", list:`;
  return prompt;
};
