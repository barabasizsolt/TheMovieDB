import { Genre, Movie, TV } from "../../constants/constants";

export interface HolderProps {
  genres?: Genre[];
  type?: string;
}

export interface HolderState {
  results: TV[] | Movie[];
}
