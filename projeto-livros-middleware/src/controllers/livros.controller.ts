import type { Request, Response, NextFunction } from "express";
import * as livrosService from "../services/livros.service.js";

import { AppError } from "../middlewares/AppError.js";


export function listarLivros(
  request: Request,
  response: Response
) {

  const livros = livrosService.listarTodos();

  return response.status(200).json(livros);
}

export function buscarLivro(
  request: Request,
  response: Response,
  next: NextFunction
) {

  try {

    const id = Number(request.params.id);

    const livro = livrosService.buscarPorId(id);

    if (!livro) {
      throw new AppError(
        "Livro não encontrado",
        404
      );
    }

    return response.status(200).json(livro);

  } catch (error) {

    next(error);

  }
}

export function criarLivro(
  request: Request,
  response: Response
) {

  try {

    const { titulo, autorId, ano } = request.body;

    const novoLivro = livrosService.criarLivro(
      titulo,
      autorId,
      ano
    );

    return response.status(201).json(novoLivro);

  } catch (error) {

    return response.status(400).json({
      mensagem: (error as Error).message
    });

  }
}

export function alterarDisponibilidade(
  request: Request,
  response: Response
) {

  const id = Number(request.params.id);

  const { disponivel } = request.body;

  const livro = livrosService.alterarDisponibilidade(
    id,
    disponivel
  );

  if (!livro) {
    return response.status(404).json({
      mensagem: "Livro não encontrado"
    });
  }

  return response.status(200).json(livro);
}

export function removerLivro(
  request: Request,
  response: Response
) {

  const id = Number(request.params.id);

  const livro = livrosService.removerLivro(id);

  if (!livro) {
    return response.status(404).json({
      mensagem: "Livro não encontrado"
    });
  }

  return response.status(204).send();
}