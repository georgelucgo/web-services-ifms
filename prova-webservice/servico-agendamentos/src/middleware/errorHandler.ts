import type {
  Request,
  Response,
  NextFunction
} from "express";

import { AppError } from "../errors/AppError";

export function errorHandler(
  erro: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (erro instanceof AppError) {
    return res.status(erro.statusCode).json({
      mensagem: erro.message,
      status: erro.statusCode,
      origem: "servico-agendamentos"
    });
  }

  return res.status(500).json({
    mensagem: "Erro interno do servidor",
    status: 500,
    origem: "servico-agendamentos"
  });
}