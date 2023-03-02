import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movies.entity";

const deleteMovieService = async (movieId: number): Promise<void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const movie = await movieRepository.findOne({
    where: {
      id: movieId,
    },
  });
  await movieRepository.remove(movie!);
};

export default deleteMovieService;
