import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../errors";
import { IUserWithoutPassword } from "../../interfaces/users.interfaces";
import { returnUserSchemaWithoutPassword, updateUserSchema } from "../../schemas/users.schemas";
import "express-async-errors";

const updatemovieService = async (
  movieId: number,
  reqBody: any
): Promise<any> => {
  if (Object.keys(reqBody).length === 0) {
    throw new AppError("Expected keys: name, email, password");
  }

  const updateParams = reqBody;

  const updateSet = Object.entries(updateParams)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => format(`${key} = %L`, value))
    .join(", ");

  let query;

  if (Object.keys(reqBody).length === 1) {
    const [key, value] = Object.entries(updateParams)[0];
    query = format(
      `
        UPDATE movies 
        SET ${format(`${key} = %L`, value)} 
        WHERE id = %L`,
      [movieId]
    );
  } else {
    query = format(
      `
        UPDATE movies 
        SET ${updateSet} 
        WHERE id = %L`,
      [movieId]
    );
  }

  await client.query(query);

  const queryResult = await client.query(
    format(
      `
        SELECT *
        FROM movies 
        WHERE id = %L`,
      [movieId]
    )
  );
  const movie = queryResult.rows[0]
  return movie;
};

export default updatemovieService;
