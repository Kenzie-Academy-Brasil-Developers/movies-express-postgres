import { Response, Request, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const ensureDetailsValidMiddleware =
  (schema: ZodTypeAny) => (req: Request, Res: Response, next: NextFunction) => {

    const validatedData = schema.parse(req.body);

    req.body = validatedData;

    return next();
  };

export default ensureDetailsValidMiddleware;
