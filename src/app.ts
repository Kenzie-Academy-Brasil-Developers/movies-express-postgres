import express, { Application } from "express";
import { handleErrors } from "./errors";
import moviesRoutes from "./routers/movies.routers";

const app: Application = express();
app.use(express.json());

app.use("/login", moviesRoutes);

app.use(handleErrors);

export default app;
