import { QueryConfig } from "pg";
import { IMovie, IMovieRequest } from "../../interfaces/movies.interfaces";

const createMovieService = async (movieData: IMovie): Promise<IMovieRequest> => {
  const { name, description, duration, price } = req.body;

  const queryString: string = `
    INSERT INTO
    "movies" ("name", "description", "duration", "price")
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [name, description, duration, price],
  };

  const queryResult: IMovieRequest = await client.query(queryConfig);

  return resp.status(201).json(queryResult.rows[0]);
};

export default createMovieService;
