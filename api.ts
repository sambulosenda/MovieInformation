const API_KEY = "cea1456ec8c33100855213994b84c765";
const BASE_URL = "https://api.themoviedb.org/3";

interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}



export const moviesAPI = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-GB&page=1`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-GB&page=1`
    ).then((res) => res.json()),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-GB&page=1&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};


  export const tvApi = {
    trending: () =>
      fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
        res.json()
      ),
    airingToday: () =>
      fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) =>
        res.json()
      ),
    topRated: () =>
      fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) =>
        res.json()
      ),

    search: ({ queryKey }) => {
      const [_, query] = queryKey;
      return fetch(
        `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-GB&page=1&query=${query}`
      ).then((res) => res.json());
    },
    detail: ({ queryKey }) => {
      const [_, id] = queryKey;
      return fetch(
        `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`
      ).then((res) => res.json());
    },
  };