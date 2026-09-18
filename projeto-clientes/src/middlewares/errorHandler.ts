import type {
  Request,
  Response,
  NextFunction
} from "express";

import { AppError } from "../errors/AppError.js";

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      mensagem: error.message
    });
  }

  return response.status(500).json({
    mensagem: "Erro interno do servidor"
  });
}