import React from "react";
import "./style.css";
import movieLogo from "./moviedb.jpg";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import { HomePage } from "../Home";
import Holder from "../Holder/holder";
import { Genre, Person, Trending } from "../../constants";

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
    //getting the genres.
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=93697a6983d40e793bc6b81401c77e1c&language=en-US"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          genres: json.genres,
        });
      });

    //getting the trendings.
    fetch(
      "https://api.themoviedb.org/3/trending/all/week?api_key=93697a6983d40e793bc6b81401c77e1c"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          trendings: json.results,
        });
      });

    //getting the actors.
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
          <Route key="home" exact path="/">
            <HomePage
              trendings={this.state.trendings}
              genres={this.state.genres}
              people={this.state.people}
            />
          </Route>
          <Route key="movie" exact path="/movie">
            <Holder genres={this.state.genres} type="movie" />
          </Route>
          <Route key="tv" exact path="/tv">
            <Holder genres={this.state.genres} type="tv" />
          </Route>
          <Redirect key="home" to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default NavBar;
