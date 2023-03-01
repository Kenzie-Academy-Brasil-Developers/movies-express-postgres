import { NextFunction, Request, Response } from "express";

const ensureMovieIdExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const idMovie: number = parseInt(req.params.id);

    const queryResult = await client.query(
      `
          SELECT * FROM "movies" 
          WHERE
             movies.id = $1;
          `,
      [idMovie]
    );

    if (!queryResult.rows[0]) {
      return resp.status(404).json({ message: "Movie not found." });
    }
  } catch (error) {
    console.log(error);
  }

  return next();
};

export default ensureMovieIdExist;
