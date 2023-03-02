import {
  IMovieReturn,
  IMovieRequest,
} from "../../interfaces/movies.interfaces";
import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Movie } from "../../entities/movies.entity";
import { returnMovieSchema } from "../../schemas/movies.schemas";

const createMovieService = async (
  movieData: IMovieRequest
): Promise<IMovieReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepository.create(movieData);

  await movieRepository.save(movie);

  const newMovie: IMovieReturn = returnMovieSchema.parse(movie);

  return newMovie;
};

export default createMovieService;
