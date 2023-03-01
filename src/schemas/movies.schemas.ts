import { optional, z } from "zod";

const movieSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().max(500).optional(),
  duration: z.number().int().positive(),
  price: z.number().int().positive(),
});

const returnMovieSchema = movieSchema.extend({
  id: z.number(),
});

export { movieSchema, returnMovieSchema };
