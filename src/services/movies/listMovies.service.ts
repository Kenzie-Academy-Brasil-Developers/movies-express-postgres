import { format } from "path";
import { QueryResult } from "pg";
import { IMovieRequest } from "../../interfaces/movies.interfaces";

const listMoviesService = async (): Promise<IMovieRequest[]> => {
  const query: string = format(
    `
    SELECT
    "id","name","email","admin","active"
    FROM
        users;
    `
  );

  const queryResult: QueryResult = await client.query(query);

  return queryResult.rows;
};

export default listMoviesService;
