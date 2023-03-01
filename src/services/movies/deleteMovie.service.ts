import { QueryConfig } from "pg";

const deleteMovieService = async (movieId: number): Promise<void> => {
  const queryString: string = `
    UPDATE
        users
    SET
        "active" = false
    WHERE
        id = $1;
`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [movieId],
  };

  await client.query(queryConfig);
};

export default deleteMovieService;