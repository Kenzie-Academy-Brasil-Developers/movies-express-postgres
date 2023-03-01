import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureMovieNameExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const nameMovie: string = req.body.name;
  const queryResult = await client.query(
    `
          SELECT * FROM "movies" 
          WHERE
             movies.name = $1;
      `,
    [nameMovie]
  );

  const nameExistsResult = await client.query(queryResult);
  const nameExists = nameExistsResult.rows[0].exists;

  if (nameExists) {
    throw new AppError("Name already registered", 409);
  }

  return next();
};

export default ensureMovieNameExist;
