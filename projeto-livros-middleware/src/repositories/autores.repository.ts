import type { Autor } from "../types/autor.js";

let autores: Autor[] = [];

export function listarTodos() {
  return autores;
}

export function buscarPorId(id: number) {
  return autores.find(autor => autor.id === id);
}

export function salvar(autor: Autor) {
  autores.push(autor);
  return autor;
}