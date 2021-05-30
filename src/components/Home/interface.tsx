import { Genre, Person, Trending } from "../../constants/constants";

export interface HomePageProps {
  trendings: Trending[];
  people: Person[];
  genres: Genre[];
}
