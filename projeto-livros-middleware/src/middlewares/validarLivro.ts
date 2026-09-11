import type { Request, Response, NextFunction } from "express";

export function validarLivro(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const { titulo, autorId, ano } = request.body;

  if (!titulo) {
    return response.status(400).json({
      mensagem: "Título obrigatório"
    });
  }

  if (!autorId) {
    return response.status(400).json({
      mensagem: "autorId obrigatório"
    });
  }

  if (!ano) {
    return response.status(400).json({
      mensagem: "Ano obrigatório"
    });
  }

  next();
}