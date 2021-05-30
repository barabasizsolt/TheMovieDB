export const BASE_PATH = "https://image.tmdb.org/t/p/w400/";
export const MIN_PAGE = 1;
export const MAX_PAGE = 99;

//Interface for Genre type.
export interface Genre {
  id: number;
  name: string;
}

//Interface for Movie type.
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

//Interface for TV type.
export interface TV {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  original_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

//Interface for Trending(Movie/TV) type.
export interface Trending {
  media_type: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

//Interface for Person(Actors) type.
export interface Person {
  known_for_department: string;
  id: number;
  name: string;
  known_for: Trending[];
  profile_path: string;
  adult: boolean;
  gender: number;
  popularity: number;
  media_type: string;
}

//Custom 'hash' container.
export interface IHash {
  [title: string]: string;
}

//Get the genres values based on their id's.
export const getGenres = (genres: Genre[], results: any[]) => {
  const generatedGenres: IHash = {};

  results.forEach((res: any) => {
    var filtered = genres.filter(function (item) {
      return res?.genre_ids.indexOf(item.id) !== -1;
    });

    const totalGenres = filtered.map((e) => e.name).join(" ");
    generatedGenres["title" in res ? res?.title : res?.name] = totalGenres;
  });

  return generatedGenres;
};

//Calculating media type.
export const mediaType: IHash = {
  movie: "Movie",
  tv: "TV Show",
};
