import { Request, Response } from "express";
import { IMovie } from "../interfaces/movies.interfaces";
import createMovieService from "../services/movies/createMovies.service";

const createMoviesController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const movieData: IMovie = req.body;
    const newMovie = await createMovieService(movieData);
    return res.status(201).json(newMovie);
  };

  export {createMoviesController}