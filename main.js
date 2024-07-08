// const API_KEY = `d787306ca4424a128d6c0ff4f0061698`
let news = [];

const getLatestNews = async () => {
  let url = new URL(`https://victoria-news.netlify.app/top-headlines`);
  let response = await fetch(url);
  let data = await response.json();
  news = data.articles;
    console.log("ddd", news);
}

getLatestNews();
