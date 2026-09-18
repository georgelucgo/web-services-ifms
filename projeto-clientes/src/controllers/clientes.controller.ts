import type {
  Request,
  Response,
  NextFunction
} from "express";

import * as clientesService
  from "../services/clientes.service.js";

export async function criarCliente(
  request: Request,
  response: Response,
  next: NextFunction
) {

  try {

    const {
      nome,
      email,
      cep
    } = request.body;

    const cliente =
      await clientesService.criarCliente(
        nome,
        email,
        cep
      );

    return response.status(201).json(cliente);

  } catch (error) {

    next(error);

  }
}

export function listarClientes(
  request: Request,
  response: Response
) {

  const clientes =
    clientesService.listarClientes();

  return response.status(200).json(clientes);
}