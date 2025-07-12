// https://hacker-news.firebaseio.com/v0/item/8863.json -- URL for a single item
// https://hacker-news.firebaseio.com/v0/topstories.json -- URL to fetch 500 top stories

import ArticleData from "./components/ArticleData";

//what are app needs to do
//1. fetch all the 500 top stories id's
//2. keep the first 10
//3. for each of those 10 id's fetch the data
//4. send all the data to a list component to render

function App() {
  return <ArticleData />;
}

export default App;
