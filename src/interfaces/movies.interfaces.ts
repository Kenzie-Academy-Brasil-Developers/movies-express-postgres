import { QueryResult } from "pg";
import { DeepPartial } from "typeorm";
import { TypeOf, z } from "zod";
import {
  movieSchema,
  returnMovieSchema,
  returnAllMoviesSchema,
} from "../schemas/movies.schemas";

type IMovieRequest = z.infer<typeof movieSchema>;
type IMovieReturn = z.infer<typeof returnMovieSchema>;
type IAllMoviesReturn = z.infer<typeof returnAllMoviesSchema>;
type IMovieUpdate = DeepPartial<IMovieRequest>;

export { IMovieRequest, IMovieReturn, IAllMoviesReturn, IMovieUpdate };
