import { Request, Response } from "express";
import { IMovie } from "../interfaces/movies.interfaces";
import createMovieService from "../services/movies/createMovies.service";
import deleteMovieService from "../services/movies/deleteMovie.service";
import listMoviesService from "../services/movies/listMovies.service";
import updatemovieService from "../services/movies/updateMovie.service";

const createMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: IMovie = req.body;
  const newMovie = await createMovieService(movieData);
  return res.status(201).json(newMovie);
};

const listMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Movies = await listMoviesService();

  return res.json(Movies);
};

const updateMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieId: number = parseInt(req.params.id);
  const reqBody: any = req.body;

  const user = await updatemovieService(movieId, reqBody);

  return res.json(user);
};

const deleteMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieId: number = parseInt(req.params.id);

  await deleteMovieService(movieId);

  return res.status(204).send();
};

export {
  createMoviesController,
  listMoviesController,
  updateMovieController,
  deleteMovieController,
};
