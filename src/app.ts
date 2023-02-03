import express, { Application } from "express";

import { startDataBase } from "./database";
import { createMovie, listMovies } from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/movies", createMovie);
app.get("/movies", listMovies);
app.patch("/movies");
app.delete("/movies");

app.listen(3000, async () => {
  await startDataBase();
  console.log("Server is running");
});
