import React from "react";
import { FlipCard } from "../FlipCard/index";
import { HolderState, HolderProps } from "./interface";
import { Genres } from "../Genres/index";
import "./style.css";
import { SearchBar } from "../SearchBar/index";
import { BASE_PATH, MIN_PAGE, MAX_PAGE, getGenres } from "../../constants";
const lodash = require("lodash");

class Holder extends React.Component<HolderProps, HolderState> {
  inputRef: React.RefObject<HTMLFormElement>;
  genresIdList: number[] = [];
  selectedGenresId = "878";
  page = 1;
  filterPage = 1;
  filterFromSearchBar = false;
  query = "";

  constructor(props: HolderProps) {
    super(props);

    this.state = {
      results: [],
    };

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.filterPages();
  }

  handleOnClickNext = () => {
    if (!this.filterFromSearchBar) {
      if (this.page === MAX_PAGE) {
        this.page = MIN_PAGE;
      } else {
        this.page++;
      }
      this.filterPages();
    } else {
      if (this.filterPage === MAX_PAGE) {
        this.filterPage = MIN_PAGE;
      } else {
        this.filterPage++;
      }
      this.findMovieByName();
    }
  };

  handleOnClickBack = () => {
    if (!this.filterFromSearchBar) {
      if (this.page === 1) {
        this.page = MAX_PAGE;
      } else {
        this.page--;
      }
      this.filterPages();
    } else {
      if (this.filterPage === 1) {
        this.filterPage = MAX_PAGE;
      } else {
        this.filterPage--;
      }
      this.findMovieByName();
    }
  };

  handleGenresClick = (event: any) => {
    this.filterFromSearchBar = false;

    if (event.target.type === "checkbox") {
      const genre = Number(event.target.value);

      if (event.target.checked) {
        if (!this.genresIdList.includes(genre)) {
          this.genresIdList.push(genre);
        }
      } else {
        const index = this.genresIdList.indexOf(genre);
        if (index > -1) {
          this.genresIdList.splice(index, 1);
        }
      }
      this.selectedGenresId = this.genresIdList.join(",");
      this.page = MIN_PAGE;
      this.filterPages();
    }
  };

  handleFilterByName = (event: any) => {
    this.filterFromSearchBar = true;
    this.query = event.target.value;
    console.log(this.query.length);

    if (this.query !== "") {
      this.filterPage = MIN_PAGE;
      lodash.debounce(this.findMovieByName, 500)();
    } else {
      this.filterFromSearchBar = false;
      this.filterPages();
    }
  };

  filterPages = () => {
    if (this.props.type === "movie") {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=93697a6983d40e793bc6b81401c77e1c&language=en-US&with_genres=${this.selectedGenresId}&page=${this.page}`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.results !== undefined) {
            this.setState({
              results: json.results,
            });
          }
        });
      this.inputRef.current?.reset();
    } else if (this.props.type === "tv") {
      fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=93697a6983d40e793bc6b81401c77e1c&language=en-US&with_genres=${this.selectedGenresId}&page=${this.page}`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.results !== undefined) {
            this.setState({
              results: json.results,
            });
          }
        });
      this.inputRef.current?.reset();
    }
  };

  findMovieByName = () => {
    if (this.props.type === "movie") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=93697a6983d40e793bc6b81401c77e1c&language=en-US&query=${this.query}&page=${this.filterPage}`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.results !== undefined) {
            this.setState({
              results: json.results,
            });
          }
        });
    } else if (this.props.type === "tv") {
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=93697a6983d40e793bc6b81401c77e1c&language=en-US&query=${this.query}&page=${this.filterPage}`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.results !== undefined) {
            this.setState({
              results: json.results,
            });
          }
        });
    }
  };

  render() {
    const { genres } = this.props;
    const generatedGenres = getGenres(genres, this.state.results);

    return (
      <div className="main-container">
        <div>
          <Genres
            className="genres"
            genres={genres}
            onClick={this.handleGenresClick}
          />
          <div className="button-group">
            <button className="filter-button" onClick={this.handleOnClickBack}>
              Back
            </button>
            <button className="filter-button" onClick={this.handleOnClickNext}>
              Next
            </button>
          </div>
        </div>
        <div className="card-search-container">
          <SearchBar
            ref={this.inputRef}
            className="search-bar"
            placeholder="Search for movies..."
            onChange={this.handleFilterByName}
          />
          <div className="card-container">
            {this.state.results.map((res: any) => (
              <FlipCard
                className={"card-item"}
                title={"title" in res ? res?.title : res?.name}
                img={BASE_PATH + res?.poster_path}
                vote_average={"Vote average: " + res?.vote_average}
                release_date={
                  "Released date: " + "release_date" in res
                    ? res?.release_date
                    : res?.first_air_date
                }
                overview={
                  generatedGenres["title" in res ? res?.title : res?.name]
                }
                key={res?.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Holder;
