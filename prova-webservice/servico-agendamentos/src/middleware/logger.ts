import type {
  Request,
  Response,
  NextFunction
} from "express";

export function logger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const horario = new Date().toLocaleString("pt-BR");

  console.log(horario, req.method, req.originalUrl);

  next();
}