import type { Request, Response, NextFunction } from "express";

export function logger(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const metodo = request.method;
  const url = request.url;

  console.log(`[${metodo}] ${url}`);

  next();
}