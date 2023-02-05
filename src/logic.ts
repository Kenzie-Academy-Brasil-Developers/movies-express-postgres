import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import { iListMovies, iMovie } from "./interfaces";

const createMovie = async (req: Request, resp: Response): Promise<Response> => {
  const newMovie: iMovie = req.body;

  const queryString: string = `
    insert into
    movies(name, description, duration, price)
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

const listMovies = async (req: Request, resp: Response): Promise<Response> => {
  let page = req.query.page === undefined ? 0 : req.query.page;
  const per_page = req.query.per_page === undefined ? 0 : req.query.per_page;

  const queryString: string = `
    select
        *
    from
        movies
        limit $1 offset $2;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [per_page, page],
  };

  const queryResult: iListMovies = await client.query(queryConfig);

  return resp.status(200).json(queryResult.rows);
};

const updateMovie = async (req: Request, resp: Response): Promise<Response> => {
  const newMovie: iMovie = req.body;
  const idMovie: string = req.params.id;
  const valuesMovie = Object.values(newMovie);

  const queryString: string = `
    update movies set
    name = $1,
    description = $2,
    duration = $3,
    price = $4
    where 
    id = $5
    returning*;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [...valuesMovie, idMovie],
  };

  const queryResult: iListMovies = await client.query(queryConfig);

  return resp.status(200).json(queryResult.rows[0]);
};

const deleteMovie = async (req: Request, resp: Response): Promise<Response> => {
  const idMovie: string = req.params.id;
  const queryString = `
    delete from movies
    where id = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idMovie],
  };

  await client.query(queryConfig);
  return resp.status(204).send();
};

export { listMovies, createMovie, updateMovie, deleteMovie };
