const mainUrl = 'https://api.jikan.moe/v3/top/anime';
const main = document.querySelector('.main');
// `${mainUrl}/search/anime?q=${query}&page=1`
const form = document.querySelector('.header-form');
const search = document.querySelector('.header-search');
const searchURL ='https://api.jikan.moe/v3/search/anime?q=';


async function getAnimeTop() {
  // const form = new FormData(this)
    const res = await fetch('https://api.jikan.moe/v4/top/anime');
    const data = await res.json();
    showAnime(data);
    console.log(data);
  }

  window.addEventListener('load', getAnimeTop); // stranno!

function showAnime(data) {
  main.innerHTML = '';
  
  data.data.forEach(anime => {
    const {images, title, score, url, synopsis} = anime
    const animeEl = document.createElement('div');
    animeEl.classList.add('movie-wrapper');
    animeEl.innerHTML = ` 
    <img src='${images.jpg.image_url}'
    alt="${title}"
    class="movie-poster"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getColor(score)}">${score}</span>
  </div>
  <div class="movie-descr">
  <a target="blank" style='color:firebrick' href='${url}'>Link Anime</a><br>
    ${synopsis}
  </div>`

    main.appendChild(animeEl)
  });
}

function showAnimeSearch(data) {
  main.innerHTML = '';
  
  data.results.forEach(anime => {
    const {image_url, title, score, url, synopsis} = anime
    const animeEl = document.createElement('div');
    animeEl.classList.add('movie-wrapper');
    animeEl.innerHTML = ` 
    <img src='${image_url}'
    alt="${title}"
    class="movie-poster"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getColor(score)}">${score}</span>
  </div>
  <div class="movie-descr">
  ${synopsis}
  <a href='${url}'>Link Anime</a> 
  </div>`

    main.appendChild(animeEl)
  });
}

function getColor(vote) {
  if(vote>= 8){
      return 'green'
  }else if(vote >= 5){
      return "orange"
  }else{
      return 'red'
  }
}
// ______________________________________________________________
// function searchAnime(event) {
//   event.preventDefault();
//   const form = new FormData(this);
//   const query = form.get('.header-search');

//   fetch(`${mainUrl}/search/anime?q=${query}&page=1`)
//   .then(res=>res.json())
//   // .then
//   .catch(err=>console.warn(err.message));
// }
// _________________________________________________________________________
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchItem = search.value;
  const searchJikanUrl = 'https://api.jikan.moe/v3/search/anime?q=';
  
  if(searchItem) {
    async function getAnimeList() {
      const res = await fetch(searchJikanUrl + searchItem);
      const data = await res.json();
      showAnimeSearch(data);
      console.log(data);
    }
  getAnimeList()
    console.log(searchItem)
  } else {
    // getAnime(mainUrl)
    console.log("null")
  }
})


// const apiKey = 'api_key=3fd2be6f0c70a2a598f084ddfb75487c';
// const mainUrl = 'https://api.themoviedb.org/3';
// const apiUrl = mainUrl + '/discover/movie?sort_by=popularity.desc&' + apiKey;
// const imgUrl = 'https://image.tmdb.org/t/p/w500';

// const main = document.querySelector('.main');

// getMovies()

// async function getMovies() {
//   const res = await fetch(apiUrl);
//   const data = await res.json();
//   showMovies(data.results);
//   console.log(data.results);
// }

// function showMovies(data) {
//   main.innerHTML = '';
//   data.forEach(el => {
//     const {poster_path, title, vote_average, overview} = el
//     const movieEl = document.createElement('div');
//     movieEl.classList.add('movie-wrapper');
//     movieEl.innerHTML = ` 
//     <img src="${imgUrl + poster_path}"
//     alt="${title}"
//     class="movie-poster"
//   />
//   <div class="movie-info">
//     <h3>${title}</h3>
//     <span class="${getColor(vote_average)}">${vote_average}</span>
//   </div>
//   <div class="movie-descr">
//     ${overview}
//   </div>`

//     main.appendChild(movieEl)
//   });
// }

// function getColor(vote) {
//   if(vote>= 8){
//       return 'green'
//   }else if(vote >= 5){
//       return "orange"
//   }else{
//       return 'red'
//   }
// }

