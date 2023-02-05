import { QueryResult } from "pg";

interface iMovie {
  name: string;
  description: string;
  duration: number;
  price: number;
}

interface iMovieId extends iMovie {
  id: string;
}

type iListMovies = QueryResult<iMovie>;

export { iMovie, iListMovies, iMovieId };
