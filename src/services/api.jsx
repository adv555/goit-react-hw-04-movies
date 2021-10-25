const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `3d673b2d8e40eafc68577fae5a6a1f4b`;
const TRENDING_URL = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&include_adult=false`;
const MOVIE_BY_SEARCH = `${BASE_URL}/search/movie?api_key=${API_KEY}&include_adult=false`;
const MOVIE_BY_ID = `${BASE_URL}/movie`;

const fetchTrending = (page = 1) => {
  const url = `${TRENDING_URL}&page=${page}`;
  return fetch(url).then(response => response.json());
};

const fetchMoviesBySearch = (searchQuery, page) => {
  const url = `${MOVIE_BY_SEARCH}&query=${searchQuery}&page=${page}`;
  return fetch(url).then(response => response.json());
};

const fetchFullInfoOfMovie = movieId => {
  const url = `${MOVIE_BY_ID}/${movieId}?api_key=${API_KEY}`;
  return fetch(url).then(response => response.json());
};

const fetchfMovieCast = movieId => {
  const url = `${MOVIE_BY_ID}/${movieId}/credits?api_key=${API_KEY}`;
  return fetch(url).then(response => response.json());
};

const fetchfMovieReview = movieId => {
  const url = `${MOVIE_BY_ID}/${movieId}/reviews?api_key=${API_KEY}`;
  return fetch(url).then(response => response.json());
};

export {
  fetchTrending,
  fetchMoviesBySearch,
  fetchFullInfoOfMovie,
  fetchfMovieCast,
  fetchfMovieReview,
};

// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
// https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1

// function checkData(searchQuery) {
//   return response => {
//     // console.log(searchQuery);
//     if (response.ok) {
//       return response.json();
//     }
//     return Promise.reject(
//       new Error(`no results were found for your search ${searchQuery}`),
//     ); // если 404
//   };
// }
