import React from "react";
import { FlipCard } from "../FlipCard/index";
import { TVHolderState, HolderProps, IHash } from "./interface";
import { Genres } from "../Genres/index";
import "./style.css";
import { SearchBar } from "../SearchBar/index";
import { BASE_PATH, MIN_PAGE, MAX_PAGE } from "../../constants";
const lodash = require("lodash");

//TODO: ha nincs kep akkor placehorder
//TODO: ha nincs film megjeleniteni vmit
//BUG: egy egy kep szurke

class TVHolder extends React.Component<HolderProps, TVHolderState> {
  inputRef: React.RefObject<HTMLFormElement>;
  genresIdList: number[] = [];
  selectedGenresId = "16";
  page = 1;
  tvPage = 1;
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
      if (this.tvPage === MAX_PAGE) {
        this.tvPage = MIN_PAGE;
      } else {
        this.tvPage++;
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
      if (this.tvPage === 1) {
        this.tvPage = MAX_PAGE;
      } else {
        this.tvPage--;
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
      this.tvPage = MIN_PAGE;
      lodash.debounce(this.findMovieByName, 500)();
    } else {
      this.filterFromSearchBar = false;
      this.filterPages();
    }
  };

  filterPages = () => {
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
  };

  findMovieByName = () => {
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=93697a6983d40e793bc6b81401c77e1c&language=en-US&query=${this.query}&page=${this.tvPage}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.results !== undefined) {
          this.setState({
            results: json.results,
          });
        }
      });
  };

  getGenres = () => {
    const { genres } = this.props;
    const generatedGenres: IHash = {};

    this.state.results.forEach((res) => {
      var filtered = genres.filter(function (item) {
        return res?.genre_ids.indexOf(item.id) !== -1;
      });

      const totalGenres = filtered.map((e) => e.name).join(" ");
      generatedGenres[res?.name] = totalGenres;
    });

    return generatedGenres;
  };

  render() {
    const { genres } = this.props;
    const generatedGenres = this.getGenres();

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
            placeholder="Search for TV series..."
            onChange={this.handleFilterByName}
          />
          <div className="card-container">
            {this.state.results.map((res) => (
              <FlipCard
                className={"card-item"}
                title={res?.name}
                img={BASE_PATH + res?.poster_path}
                vote_average={"Vote average: " + res?.vote_average}
                release_date={"Released date: " + res?.first_air_date}
                overview={generatedGenres[res?.name]}
                key={res?.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TVHolder;
