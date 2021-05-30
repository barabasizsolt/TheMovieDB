import React from "react";
import { getGenres, mediaType, Person } from "../../constants";
import { FlipCard } from "../FlipCard";
import { HomePageProps } from "./interface";
import "./style.css";

const basePath = "https://image.tmdb.org/t/p/w400/";

export const HomePage: React.FC<HomePageProps> = (props) => {
  const { trendings, genres, people } = props;
  const generatedGenres = getGenres(genres, trendings);

  return (
    <div className="main">
      <h1 className="head">
        Millions of movies, TV shows and people to discover. Explore now.
      </h1>
      <h2>What's Popular</h2>
      <div className="card-holder">
        <div className="row">
          {trendings.map((res: any) => (
            <FlipCard
              className="card"
              title={"title" in res ? res?.title : res?.name}
              img={basePath + res?.poster_path}
              vote_average={"Vote average: " + res?.vote_average}
              release_date={
                "Released date: " + "release_date" in res
                  ? res?.release_date
                  : res?.first_air_date
              }
              overview={
                generatedGenres["title" in res ? res?.title : res?.name]
              }
              type={mediaType[res?.media_type]}
              key={res?.id}
            />
          ))}
        </div>
      </div>
      <h2>Famous Actors</h2>
      <div className="card-holder">
        <div className="row-person">
          {people.map((res: Person) => (
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
