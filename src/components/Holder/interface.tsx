import { Genre, IHash, Movie, TV } from "../../constants";

export interface HolderProps {
  genres: Genre[];
  type: string;
}

export interface HolderState {
  results: TV[] | Movie[];
}
