import React from "react";
import "./style.css";
import movieLogo from "./moviedb.jpg";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import { HomePage, Person, Trending } from "../Home";
import MovieHolder from "../Holder/movie";
import TVHolder from "../Holder/tv";

export class Genre {
  id: number;
  name: string;
}

interface NavBarState {
  genres: Genre[];
  trendings: Trending[];
  people: Person[];
}

class NavBar extends React.Component<{}, NavBarState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      genres: [],
      trendings: [],
      people: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=93697a6983d40e793bc6b81401c77e1c&language=en-US"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          genres: json.genres,
        });
      });

    fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=93697a6983d40e793bc6b81401c77e1c"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          trendings: json.results,
        });
      });

    fetch(
      "https://api.themoviedb.org/3/trending/person/week?api_key=93697a6983d40e793bc6b81401c77e1c&page=2"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          people: json.results,
        });
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="header">
          <div className="logo">
            <img src={movieLogo} alt="Movie Database Logo" />
          </div>

          <div className="header-links">
            <Link className="item" to="/">
              Home
            </Link>
            <Link className="item" to="/movie">
              Movies
            </Link>
            <Link className="item" to="/tv">
              TV Shows
            </Link>
          </div>
        </div>
        <Switch>
          <Route exact path="/">
            <HomePage
              trendings={this.state.trendings}
              genres={this.state.genres}
              people={this.state.people}
            />
          </Route>
          <Route exact path="/movie">
            <MovieHolder genres={this.state.genres} />
          </Route>
          <Route exact path="/tv">
            <TVHolder genres={this.state.genres} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default NavBar;
