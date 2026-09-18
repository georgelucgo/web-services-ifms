import type {
  Request,
  Response,
  NextFunction
} from "express";

import * as enderecoService
  from "../services/enderecos.service.js";

export async function buscarEndereco(
  request: Request,
  response: Response,
  next: NextFunction
) {

  try {

    const cep = String(request.params.cep);

    const endereco =
      await enderecoService.consultarCep(cep);

    return response.status(200).json(endereco);

  } catch (error) {

    next(error);

  }
}