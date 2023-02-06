import { QueryResult } from "pg";

interface iMovie {
  name: string;
  description: string;
  duration: number;
  price: number;
}

interface iMovieId extends iMovie {
  id: number;
}

type iListMovies = QueryResult<iMovie>;
type irequeridKeys = "name" | "description" | "duration" | "price";

export { iMovie, iListMovies, iMovieId, irequeridKeys};
