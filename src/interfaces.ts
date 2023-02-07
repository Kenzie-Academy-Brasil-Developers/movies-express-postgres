import { QueryResult } from "pg";

interface IMovie {
  name: string;
  description: string;
  duration: number;
  price: number;
}

interface IMovieId extends IMovie {
  id: number;
}

type IListMovies = QueryResult<IMovie>;
type IrequeridKeys = "name" | "description" | "duration" | "price";

export { IMovie, IListMovies, IMovieId, IrequeridKeys };
