import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movies.entity";
import { IMovieReturn, IMovieUpdate } from "../../interfaces/movies.interfaces";
import { returnMovieSchema } from "../../schemas/movies.schemas";

const updatemovieService = async (
  newMovieData: IMovieUpdate,
  idUser: number
): Promise<IMovieReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldUserData = await movieRepository.findOneBy({
    id: idUser,
  });

  const user = movieRepository.create({
    ...oldUserData,
    ...newMovieData,
  });

  await movieRepository.save(user);

  const updatedUser = returnMovieSchema.parse(user);

  return updatedUser;
};

export default updatemovieService;
