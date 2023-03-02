import { Router } from "express";
import {
  createMoviesController,
  listMoviesController,
  updateMovieController,
  deleteMovieController,
} from "../controllers/movies.controllers";
import ensureDetailsValidMiddleware from "../middlewares/ensureDetailsValid.middlewares";
import ensureMovieIdExist from "../middlewares/ensureMovieIdExist.middleware";
import ensureMovieNameExist from "../middlewares/ensureMovieNameExist.middleware";
import { movieSchema } from "../schemas/movies.schemas";

const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  ensureDetailsValidMiddleware(movieSchema),
  ensureMovieNameExist,
  createMoviesController
);
moviesRoutes.get("", listMoviesController);
moviesRoutes.patch(
  "/:id",
  ensureMovieIdExist,
  ensureMovieNameExist,
  updateMovieController
);
moviesRoutes.delete("/:id", ensureMovieIdExist, deleteMovieController);

export default moviesRoutes;
