import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import { iListMovies, iMovie } from "./interfaces";

const listMovies = async (req: Request, resp: Response): Promise<Response> => {
  const queryString: string = `
    select
        *
    from
        todos;
    `;

  const queryResult: iListMovies = await client.query(queryString);

  return resp.status(200).json(queryResult.rows);
};

const createMovie = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const newMovie: iMovie = req.body;
 
  const queryString: string = `
  insert into
  todos(name, description, duration, price)
  values
  ($1, $2, $3, $4)
  returning *;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: Object.values(newMovie),
  };

  const queryResult: iListMovies = await client.query(queryConfig);

  return resp.status(201).json(queryResult.rows[0]);
};

export { listMovies, createMovie };
