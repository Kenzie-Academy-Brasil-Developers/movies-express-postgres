import { Router } from "express";
import { createMoviesController } from "../controllers/movies.controllers";

const moviesRoutes: Router = Router();

moviesRoutes.post("/movies", createMoviesController);
moviesRoutes.get("/movies");
moviesRoutes.patch("/movies/:id");
moviesRoutes.delete("/movies/:id");

// moviesRoutes.post("/movies", ensureMovieNameExist, createMoviesController);
// moviesRoutes.get("/movies", listMovies);
// moviesRoutes.patch("/movies/:id", ensureMovieIdExist, ensureMovieNameExist, updateMovie);
// moviesRoutes.delete("/movies/:id", ensureMovieIdExist, deleteMovie);

export default moviesRoutes;
