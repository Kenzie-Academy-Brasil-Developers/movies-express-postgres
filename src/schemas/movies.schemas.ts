import { optional, z } from "zod";

const movieSchema = z.object({
  name: z.string().min(1).max(50),
  description: optional(z.string().max(500)).nullable(),
  duration: z.number().int().positive(),
  price: z.number().int().positive(),
});

const returnMovieSchema = movieSchema.extend({
  id: z.number(),
});

const returnAllMoviesSchema = returnMovieSchema.array()

const userUpdateSchema = movieSchema.partial()

export { movieSchema, returnMovieSchema, returnAllMoviesSchema, userUpdateSchema };
