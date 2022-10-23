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

export const getBetterNewsPrompt = (cleanText) => {
  const prompt = `The following changes to make the articles more positive so that we feel better about the future. 
  [
    {original: "Your Sunday Briefing: From the Economy to Big Tech Earnings", funnyEdited: "Have a Great Sunday: Here's what's new!"}, 
    {original: "The iPad Lineup Is Perplexing — Here’s How Apple Could Fix It", funnyEdited: "iPads are great and here are some new ideas to make them event better!"} 
    {original: "Can Taylor Swift Be Dethroned by Artificial Intelligence?", funnyEdited: "Maybe AI and Taylor Swift should do a collab. That'd be cool!"} 
    {original: "${cleanText}", funnyEdited:`;
  return prompt;
};

export const getTurtleContentPrompt = (cleanText) => {
  const prompt = `The following changes the original text to funny text about turtles: 
[
  {original: "Jimmy John", funnyEdited: "Jimmy Turtle"}, 
  {original: "A database without dynamic memory allocation ", funnyEdited: "A database without dynamic TURTLES"}"} 
  {original: "The best way to buy the products you love.", funnyEdited: "Products are just Turtles"} 
  {original: "Billionaire Bankman-Fried Tries to Fix Crypto’s Hacking Problem", funnyEdited: "Billionaire Bankman-Fried buys 10,000 turtles"}
  {original: "Markets Calling: Forget It, Tories, You Can Go It Alone", funnyEdited: "Markets calling: We need more turtles"}
  {original: "${cleanText}", funnyEdited:`;
  return prompt;
};
