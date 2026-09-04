import * as autoresRepository from "../repositories/autores.repository.js";

export function listarTodos() {
  return autoresRepository.listarTodos();
}

export function criarAutor(
  nome: string,
  nacionalidade: string
) {

  if (!nome) {
    throw new Error("Nome obrigatório");
  }

  if (!nacionalidade) {
    throw new Error("Nacionalidade obrigatória");
  }

  const autores = autoresRepository.listarTodos();

  const novoAutor = {
    id: autores.length + 1,
    nome,
    nacionalidade
  };

  return autoresRepository.salvar(novoAutor);
}