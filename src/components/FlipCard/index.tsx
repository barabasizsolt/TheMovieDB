import React from "react";
import "./style.css";

interface FlipCardProps {
  className: string;
  title?: string;
  img?: string;
  vote_average?: string;
  release_date?: string;
  overview?: string;
  width?: string;
  height?: string;
  fsize?: string;
}

export const FlipCard: React.FC<FlipCardProps> = (props) => {
  const {
    title,
    img,
    vote_average,
    release_date,
    overview,
    width,
    height,
    fsize,
  } = props;

  return (
    <div className="flip-card" style={{ width: width, height: height }}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={img} style={{ width: width, height: height }} />
        </div>
        <div className="flip-card-back" style={{ fontSize: fsize }}>
          <h1>{title}</h1>
          <p>{release_date}</p>
          <p>{vote_average}</p>
          <div className="flip-card-back-overview">
            <p>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
