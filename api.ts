const API_KEY = "cea1456ec8c33100855213994b84c765";
const BASE_URL = "https://api.themoviedb.org/3";

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
    res.json()
  );

const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-GB&page=1`
  ).then((res) => res.json());
  

const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-GB&page=1`
  ).then((res) => res.json());


  export const moviesAPI = { trending, upcoming, nowPlaying}