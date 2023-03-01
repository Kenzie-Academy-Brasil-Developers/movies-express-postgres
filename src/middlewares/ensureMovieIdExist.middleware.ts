import { NextFunction, Request, Response } from "express";
import { QueryResult } from "typeorm";
import { AppError } from "../errors";

const ensureMovieIdExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const idMovie: number = parseInt(req.params.id);

  const queryResult = await client.query(
    `
          SELECT * FROM "movies" 
          WHERE
             movies.id = $1;
          `,
    [idMovie]
  );

  const queryResult: QueryResult = await client.query(queryStringUserExists);

  if (queryResult.rowCount === 0) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};

export default ensureMovieIdExist;
