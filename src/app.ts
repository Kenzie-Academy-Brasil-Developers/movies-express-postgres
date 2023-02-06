import express, { Application } from "express";

import { startDataBase } from "./database";
import { createMovie, deleteMovie, listMovies, updateMovie } from "./logic";
import { ensureMovieIdExist, ensureMovieNameExist, validateBody } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/movies", validateBody, ensureMovieNameExist, createMovie);
app.get("/movies", listMovies);
app.patch("/movies/:id", ensureMovieIdExist, ensureMovieNameExist, updateMovie);
app.delete("/movies/:id", ensureMovieIdExist, deleteMovie);

app.listen(3000, async () => {
  await startDataBase();
  console.log("Server is running");
});
