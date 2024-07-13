// const API_KEY = `d787306ca4424a128d6c0ff4f0061698`
//`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
// `https://victoria-news.netlify.app/top-headlines?country=kr&pageSize=${pageSize}&page=${page}${category}${keyword}`
let category = "";
let keyword = "";
let newsList = [];
let url = new URL(`https://victoria-news.netlify.app/top-headlines`);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const categories = ['Entertainment','General','Health','Science','Sports','Technology'];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event)=> getNewsCategory(event)));

const getNews = async() => {
  try{
    url.searchParams.set("page",page);
    url.searchParams.set("pageSize",pageSize);

    const response = await fetch(url);

    const data = await response.json();
    if(response.status === 200){
      if(data.articles.length === 0){
        throw new Error("No matches for your search.");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    }else {
      throw new Error(data.message)
    }
  } catch(error) {
    errorRender(error.message);
  }
};

//API
const getLatestNews = async () => {
  url = new URL(`https://victoria-news.netlify.app/top-headlines`); 
    url.searchParams.set("country", "kr");
  await getNews();
}

//Menu
const getNewsCategory = async (event) => {
  const selectedCategory = event.target.textContent.toLowerCase();
  url = new URL(
    `https://victoria-news.netlify.app/top-headlines?country=kr&category=${category}`
  );
  url.searchParams.set("country", "kr");
  url.searchParams.set("category", selectedCategory);
  await getNews();
};

//keyword
const getNewsByKeyword = async() => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(`https://victoria-news.netlify.app/top-headlines?country=kr&q=${keyword}`)
  await getNews();
};

//Search
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  let searchIcon = document.querySelector(".search-icon");

  if (inputArea.style.display === "none" || inputArea.style.display === "" ) {
    inputArea.style.display ="flex";
    searchIcon.style.display ="none"; //검색아이콘 숨기기
  }else {
    inputArea.style.display = "none";
    searchIcon.style.display = "inline-block"; //검색아이콘 보이기
  }
}

//Side-menu
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
}


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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML = errorHTML
};


const paginationRender = () => {
  const totalPages = Math.ceil(totalResults/pageSize)
  let pageGroup = Math.ceil(page/groupSize);
  let lastPage = pageGroup * groupSize;
  if(lastPage > totalPages){
    lastPage = totalPages
  }
  const firstPage = lastPage - (groupSize-1)<=0? 1: lastPage - (groupSize - 1);
  
  let paginationHTML = `<li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" href="#">Previous</a></li>`;

  for(let i=firstPage; i<=lastPage; i++){
    paginationHTML+=` <li class="page-item ${i === page? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }
  paginationHTML+=`<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" href="#">Next</a></li>`
  document.querySelector(".pagination").innerHTML = paginationHTML

//   <nav aria-label="Page navigation example">
//   <ul class="pagination">
//     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
//     <li class="page-item"><a class="page-link" href="#">1</a></li>
//     <li class="page-item"><a class="page-link" href="#">2</a></li>
//     <li class="page-item"><a class="page-link" href="#">3</a></li>
//     <li class="page-item"><a class="page-link" href="#">Next</a></li>
//   </ul>
// </nav>
}

const moveToPage = (pageNum) => {
  console.log("move",pageNum);
  page = pageNum;
  getNews()
}

getLatestNews();




