import React from "react";
import { FlipCard } from "../FlipCard";
import { IHash } from "../Holder/interface";
import { Genre } from "../Navigation";
import "./style.css";

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

interface HomePageProps {
  trendings: Trending[];
  people: Person[];
  genres: Genre[];
}

const basePath = "https://image.tmdb.org/t/p/w400/";

const getGenres = (trending: Trending[], genres: Genre[]) => {
  const generatedGenres: IHash = {};

  trending.forEach((res) => {
    var filtered = genres.filter(function (item) {
      return res?.genre_ids.indexOf(item.id) !== -1;
    });

    const totalGenres = filtered.map((e) => e.name).join(" ");
    generatedGenres[res?.title] = totalGenres;
  });

  return generatedGenres;
};

export const HomePage: React.FC<HomePageProps> = (props) => {
  const { trendings, genres, people } = props;
  const generatedGenres = getGenres(trendings, genres);

  return (
    <div className="main">
      <h1 className="head">
        Millions of movies, TV shows and people to discover. Explore now.
      </h1>
      <h2>What's Popular</h2>
      <div className="card-holder">
        <div className="row">
          {trendings.map((res) => (
            <FlipCard
              className="card"
              title={res?.title}
              img={basePath + res?.poster_path}
              vote_average={"Vote average: " + res?.vote_average}
              release_date={"Released date: " + res?.release_date}
              overview={generatedGenres[res?.title]}
              key={res?.id}
            />
          ))}
        </div>
      </div>
      <h2>Famous Actors</h2>
      <div className="card-holder">
        <div className="row-person">
          {people.map((res) => (
            <FlipCard
              className="card"
              title={res?.name}
              img={basePath + res?.profile_path}
              width="100px"
              height="150px"
              fsize="9px"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
