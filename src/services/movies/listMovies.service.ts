import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movies.entity";
import { IAllMoviesReturn } from "../../interfaces/movies.interfaces";
import { returnAllMoviesSchema } from "../../schemas/movies.schemas";

const listMoviesService = async (): Promise<IAllMoviesReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovies: Array<Movie> = await movieRepository.find();

  const movies: IAllMoviesReturn = returnAllMoviesSchema.parse(findMovies);

  return movies;
};

export default listMoviesService;
