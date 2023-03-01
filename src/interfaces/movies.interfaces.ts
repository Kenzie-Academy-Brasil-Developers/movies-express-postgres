import { QueryResult } from "pg";
import { z } from "zod";
import { movieSchema, returnMovieSchema } from "../schemas/movies.schemas";

type IMovieRequest = z.infer<typeof movieSchema>;
type IMovie = z.infer<typeof returnMovieSchema>;

export { IMovieRequest, IMovie };
