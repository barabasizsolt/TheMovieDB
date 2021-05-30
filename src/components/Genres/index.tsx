import React from "react";
import { Genre } from "../../constants";
import "./style.css";

interface InputProps {
  className?: string;
  id?: string;
  name?: string;
  value?: string;
  type: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { className, id, name, value, type, children } = props;

  return (
    <div>
      <input
        className={className}
        type={type}
        id={id}
        name={name}
        value={value}
      />
      <label>{children}</label>
    </div>
  );
};

interface GenresProps {
  genres: Genre[];
  className?: string;
  onClick?: (event: any) => void;
}

export const Genres: React.FC<GenresProps> = (props) => {
  const { genres, onClick } = props;

  return (
    <div className="container">
      <h1>Genres</h1>
      <div className="categorie-container" onClick={onClick}>
        {genres.map((res) => (
          <Input
            className="categories"
            type="checkbox"
            key={res.id}
            value={String(res.id)}
          >
            {res.name}
          </Input>
        ))}
      </div>
    </div>
  );
};
