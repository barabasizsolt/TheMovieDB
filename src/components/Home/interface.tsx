import { Genre, Person, Trending } from "../../constants";

export interface HomePageProps {
  trendings: Trending[];
  people: Person[];
  genres: Genre[];
}
