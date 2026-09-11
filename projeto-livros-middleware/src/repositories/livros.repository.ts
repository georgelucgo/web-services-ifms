import type { Livro } from "../types/livro.js";

let livros: Livro[] = [];

export function listarTodos() {
  return livros;
}

export function buscarPorId(id: number) {
  return livros.find(livro => livro.id === id);
}

export function salvar(livro: Livro) {
  livros.push(livro);
  return livro;
}

export function remover(id: number) {
  const indice = livros.findIndex(
    livro => livro.id === id
  );

  if (indice === -1) {
    return false;
  }

  livros.splice(indice, 1);

  return true;
}