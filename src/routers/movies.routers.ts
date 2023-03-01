import { Router } from "express";
import {
  createMoviesController,
  listMoviesController,
  updateMovieController,
  deleteMovieController,
} from "../controllers/movies.controllers";
import ensureMovieIdExist from "../middlewares/ensureMovieIdExist.middleware";
import ensureMovieNameExist from "../middlewares/ensureMovieNameExist.middleware";

const moviesRoutes: Router = Router();

moviesRoutes.post("/movies", ensureMovieNameExist, createMoviesController);
moviesRoutes.get("/movies", listMoviesController);
moviesRoutes.patch(
  "/movies/:id",
  ensureMovieIdExist,
  ensureMovieNameExist,
  updateMovieController
);
moviesRoutes.delete("/movies/:id", ensureMovieIdExist, deleteMovieController);

export default moviesRoutes;
