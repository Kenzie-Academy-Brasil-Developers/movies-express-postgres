import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movies.entity";
import { IAllMoviesReturn } from "../../interfaces/movies.interfaces";
import { returnAllMoviesSchema } from "../../schemas/movies.schemas";

const listMoviesService = async (data: any): Promise<IAllMoviesReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const page: number = Number(data.page) || 1;
  const perPage: number = Number(data.perPage) || 5;
  let sortProp: string = "";
  const orderValue: "ASC" | "DESC" = data.order || "ASC";

  if (data.sort == "price" || data.sort == "duration") {
    sortProp = data.sort;
  } else {
    sortProp = "id";
  }

  const order: Record<string, "ASC" | "DESC"> = {};
  if (sortProp) {
    order[sortProp] = orderValue;
  }

  const findOptions: FindManyOptions<Movie> = {
    take: perPage,
    skip: perPage * (page - 1),
    order,
  };

  const findMovies: Array<Movie> = await movieRepository.find(findOptions);

  const movies: IAllMoviesReturn = returnAllMoviesSchema.parse(findMovies);

  return movies;
};

export default listMoviesService;
