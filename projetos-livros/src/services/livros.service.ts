import * as livrosRepository from "../repositories/livros.repository.js";
import * as autoresRepository from "../repositories/autores.repository.js";

export function listarTodos() {
  return livrosRepository.listarTodos();
}

export function buscarPorId(id: number) {
  return livrosRepository.buscarPorId(id);
}

export function criarLivro(
  titulo: string,
  autorId: number,
  ano: number
) {

  if (!titulo) {
    throw new Error("Título obrigatório");
  }

  if (!autorId) {
    throw new Error("autorId obrigatório");
  }

  if (!ano) {
    throw new Error("Ano obrigatório");
  }

  const autor = autoresRepository.buscarPorId(autorId);

  if (!autor) {
    throw new Error("Autor não encontrado");
  }

  const livros = livrosRepository.listarTodos();

  const novoLivro = {
    id: livros.length + 1,
    titulo,
    autorId,
    ano,
    disponivel: true
  };

  return livrosRepository.salvar(novoLivro);
}

export function alterarDisponibilidade(
  id: number,
  disponivel: boolean
) {

  const livro = livrosRepository.buscarPorId(id);

  if (!livro) {
    return undefined;
  }

  livro.disponivel = disponivel;

  return livro;
}

export function removerLivro(id: number) {

  const livro = livrosRepository.buscarPorId(id);

  if (!livro) {
    return undefined;
  }

  livrosRepository.remover(id);

  return livro;
}