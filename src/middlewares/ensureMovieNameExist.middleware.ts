import { NextFunction, Request, Response } from "express";

const ensureMovieNameExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const nameMovie: string = req.body.name;
    const queryResult = await client.query(
      `
          SELECT * FROM "movies" 
          WHERE
             movies.name = $1;
      `,
      [nameMovie]
    );

    if (queryResult.rows[0] !== undefined) {
      return resp.status(409).json({ message: "Movie already exists." });
    }
  } catch (error) {
    console.log(error);
  }

  return next();
};

export default ensureMovieNameExist;
