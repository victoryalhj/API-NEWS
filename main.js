// const API_KEY = `d787306ca4424a128d6c0ff4f0061698`
//`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
// `https://victoria-news.netlify.app/top-headlines?country=kr&pageSize=${pageSize}&page=${page}${category}${keyword}`
let pageSize = 10;
let page = 4;
let category = "";
let keyword = "";
let newsList = [];
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsCategory(event)))

//API
const getLatestNews = async () => {
  const url = new URL(
    `https://victoria-news.netlify.app/top-headlines`
    ); 
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("ddd",newsList);
  console.log(data)
}

//menu
const getNewsCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  const url = new URL(
    `https://victoria-news.netlify.app/top-headlines?country=kr&category=${category}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("ccc", data);

  newsList = data.articles;
  render();
};

//keyword
const getNewsByKeyword= async() => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  const url = new URL(`https://victoria-news.netlify.app/top-headlines?country=kr&q=${keyword}`)
  const response = await fetch(url);
  const data = await response.json();
  console.log("keyword data", data);
  newsList = data.articles;
  render();
};

//search focus 정리필요
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input')

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', 'Search');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});


//ui그려줌, TODO-LIST for문 ,ES6 array함수, join
const render = () => {
  const newsHTML = newsList.map(
    (news) => `<div class="row news">
                <div class="col-lg-4">
                  <img class="news-img-size" src="${news.urlToImage || 'img/noimage.png'}" onerror="this.onerror=null; this.src='img/noimage.png';" />
                </div>
                <div class="col-lg-8">
                  <h2>${news.title}</h2>
                  <p>${news.description == null || news.description == "" ? "내용없음": news.description.length > 200 ? news.description.substring(0, 200) + "..." : news.description}</p>
                  <div>${news.source.name || "no source"} * ${moment(news.publishedAt, "YYYYMMDD").fromNow()}</div>
                </div>
              </div>`
    ).join('');
    console.log("html", newsHTML);

  document.getElementById('news-board').innerHTML = newsHTML
}

getLatestNews();


