import { Request, Response } from "express";
import { format } from "path";
import { QueryConfig } from "pg";
import { client } from "./database";
import { IListMovies, IMovie } from "./interfaces";

const createMovie = async (req: Request, resp: Response): Promise<Response> => {
  const newMovie: IMovie = req.body;

  const queryString: string = `
    INSERT INTO
    "movies" ("name", "description", "duration", "price")
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: Object.values(newMovie),
  };

  const queryResult: IListMovies = await client.query(queryConfig);

  return resp.status(201).json(queryResult.rows[0]);
};

const listMovies = async (req: Request, resp: Response): Promise<Response> => {
  let page: number = Number(req.query.page);
  let perPage: number = Number(req.query.per_page);

  if (page <= 0 || typeof page !== "number") {
    page = 1;
  }
  
  if (perPage <= 0 || perPage > 5 || typeof perPage !== "number") {
    perPage = 5;
  }

  const queryString: string = `
     SELECT * FROM movies
     OFFSET $1 LIMIT $2;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [perPage * (page - 1), perPage],
  };

  const baseUrl: string = "http://localhost:3000/movies";
  let prevPage: any = `${baseUrl}?page=${page - 1}&perPage=${perPage}`;
  let nextPage: any = `${baseUrl}?page=${page + 1}&perPage=${perPage}`;

  if (page === 1) {
    prevPage = null;
  }

  const queryResult: IListMovies = await client.query(queryConfig);
  const data = queryResult.rows;

  if (data.length <= 0) {
    nextPage = null;
  }

  const pagination: any = {
    prevPage,
    nextPage,
    data: queryResult.rows,
  };

  return resp.status(200).json(pagination);
};

const updateMovie = async (req: Request, resp: Response): Promise<Response> => {
  const newMovie: IMovie = req.body;
  const idMovie: number = parseInt(req.params.id);
  const valuesMovie = Object.values(newMovie);

  const queryString: string = `
    UPDATE "movies" SET
         name = $1,
         description = $2,
         duration = $3,
         price = $4
    WHERE
        id = $5
    RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [...valuesMovie, idMovie],
  };

  const queryResult: IListMovies = await client.query(queryConfig);

  return resp.status(200).json(queryResult.rows[0]);
};

const deleteMovie = async (req: Request, resp: Response): Promise<Response> => {
  const idMovie: number = parseInt(req.params.id);
  const queryString = `
    DELETE FROM "movies"
    WHERE 
        id = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idMovie],
  };

  await client.query(queryConfig);
  return resp.status(204).send();
};

export { listMovies, createMovie, updateMovie, deleteMovie };
