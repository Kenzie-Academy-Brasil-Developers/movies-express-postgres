import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movies.entity";
import { AppError } from "../errors";


const ensureMovieNameExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovieName = await movieRepository.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (findMovieName) {
    throw new AppError("Name already registered", 404);
  }

  return next();
};

export default ensureMovieNameExist;
