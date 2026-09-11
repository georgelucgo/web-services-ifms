import type { Request, Response, NextFunction } from "express";

export function verificarToken(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const token = request.headers.authorization;

  if (token !== "Bearer ifms123") {
    return response.status(401).json({
      mensagem: "Token inválido ou ausente"
    });
  }

  next();
}