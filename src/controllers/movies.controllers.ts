import { Request, Response } from "express";
import { IMovieRequest, IMovieUpdate } from "../interfaces/movies.interfaces";
import createMovieService from "../services/movies/createMovies.service";
import listMoviesService from "../services/movies/listMovies.service";
import updateMovieService from "../services/movies/updateMovie.service";
import deleteMovieService from "../services/movies/deleteMovie.service";

const createMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: IMovieRequest = req.body;
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

const updateMovieController = async (req: Request, res: Response) => {
  const userData: IMovieUpdate = req.body;
  const movieId = parseInt(req.params.id);

  const updatedMovie = await updateMovieService(userData, movieId);

  return res.json(updatedMovie);
};

const deleteMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteMovieService(parseInt(req.params.id));

  return res.status(204).send();
};

export {
  createMoviesController,
  listMoviesController,
  updateMovieController,
  deleteMovieController,
};
