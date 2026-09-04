import type { Request, Response } from "express";
import * as autoresService from "../services/autores.service.js";

export function listarAutores(
  request: Request,
  response: Response
) {

  const autores = autoresService.listarTodos();

  return response.status(200).json(autores);
}

export function criarAutor(
  request: Request,
  response: Response
) {

  try {

    const { nome, nacionalidade } = request.body;

    const novoAutor = autoresService.criarAutor(
      nome,
      nacionalidade
    );

    return response.status(201).json(novoAutor);

  } catch (error) {

    return response.status(400).json({
      mensagem: (error as Error).message
    });

  }
}