// const API_KEY = `d787306ca4424a128d6c0ff4f0061698`
// let news = [];

// const getLatestNews = async () => {
//   const url = new URL(
//     `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
//   );
//   const response = await fetch(url);
//   const data = await response.json()
//   news = data.articles;
//   console.log("ddd", news)

// };

// getLatestNews();


const API_KEY = `d787306ca4424a128d6c0ff4f0061698`
const keyword = `아이유`
const PAGE_SIZE = `10`
let news = [];

const getLatestNews = async () => {
  const url = new URL(
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=${keyword}&page=1&pageSize=${PAGE_SIZE}`
  );
  const response = await fetch(url);
  const data = await response.json()
  news = data.articles;
    console.log("ddd", news)
};

getLatestNews();