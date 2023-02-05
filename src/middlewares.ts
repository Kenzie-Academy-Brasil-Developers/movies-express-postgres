import { NextFunction, Request, Response } from "express";
import { client } from "./database";

const validateBody = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const queryString = await client.query(
    `
      select * from movies 
      where movies = $1;
      `,
    [req.body.name]
  );

  if (queryString.rows[0] !== undefined) {
    return resp.status(409).json({ message: "Esse filme já existe!" });
  }

  next();
};

const ensureMovieNameExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const queryString = await client.query(
    `
    select * from movies 
    where movies.name = $1;
    `,
    [req.body.name]
  );

  if (queryString.rows[0] !== undefined) {
    return resp.status(409).json({ message: "Movie already exists." });
  }

  next();
};

const ensureMovieIdExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const queryString = await client.query(
    `
      select * from movies 
      where movies.id = $1;
      `,
    [req.params.id]
  );

  if (!queryString.rows[0]) {
    return resp.status(404).json({ message: "Movie not found." });
  }

  next();
};

export { ensureMovieNameExist, ensureMovieIdExist };
