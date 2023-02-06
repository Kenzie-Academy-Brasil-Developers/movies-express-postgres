import { NextFunction, Request, Response } from "express";
import { client } from "./database";
import { irequeridKeys } from "./interfaces";

const validateBody = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const keys: Array<string> = Object.keys(req.body);

  const requiredKeys: Array<irequeridKeys> = [
    "name",
    "description",
    "duration",
    "price",
  ];

  let validatedKeys: boolean = requiredKeys.every((key: string) =>
    keys.includes(key)
  );

  if (!validatedKeys) {
    return resp
      .status(400)
      .json({ message: `Required fields are:${requiredKeys}` });
  }

  return next();
};

const ensureMovieNameExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    console.log(error);
  }

  return next();
};

const ensureMovieIdExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const idMovie: number = parseInt(req.params.id);

  const queryString = await client.query(
    `
      select * from movies 
      where movies.id = $1;
      `,
    [idMovie]
  );

  if (!queryString.rows[0]) {
    return resp.status(404).json({ message: "Movie not found." });
  }

  return next();
};

export { ensureMovieNameExist, ensureMovieIdExist, validateBody };
