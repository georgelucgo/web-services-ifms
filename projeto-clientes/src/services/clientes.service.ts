import { AppError } from "../errors/AppError.js";

import * as clientesRepository
  from "../repositories/clientes.repository.js";

import * as enderecoService
  from "./enderecos.service.js";

export async function criarCliente(
  nome: string,
  email: string,
  cep: string
) {

  if (!nome) {
    throw new AppError(
      "Nome obrigatório",
      400
    );
  }

  if (!email) {
    throw new AppError(
      "Email obrigatório",
      400
    );
  }

  if (!cep) {
    throw new AppError(
      "CEP obrigatório",
      400
    );
  }

  const endereco =
    await enderecoService.consultarCep(cep);

  const clientes =
    clientesRepository.listarTodos();

  const novoCliente = {
    id: clientes.length + 1,
    nome,
    email,
    cep,
    endereco
  };

  return clientesRepository.salvar(
    novoCliente
  );
}

export function listarClientes() {
  return clientesRepository.listarTodos();
}