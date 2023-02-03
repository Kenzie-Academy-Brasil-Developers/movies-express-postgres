import express, { Application } from "express";

import { startDataBase } from "./database";

const app: Application = express();

app.listen(3000, async () => {
  await startDataBase();
  console.log("Server is running");
});
