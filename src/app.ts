import express, { Application } from "express";

import { startDataBase } from "./database";
import { createMovie, deleteMovie, listMovies, updateMovie } from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/movies", createMovie);
app.get("/movies", listMovies);
app.patch("/movies/:id", updateMovie);
app.delete("/movies/:id", deleteMovie);

app.listen(3000, async () => {
  await startDataBase();
  console.log("Server is running");
});
