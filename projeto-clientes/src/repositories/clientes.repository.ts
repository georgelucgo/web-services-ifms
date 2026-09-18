import type { Cliente } from "../types/cliente.js";

let clientes: Cliente[] = [];

export function listarTodos() {
  return clientes;
}

export function salvar(cliente: Cliente) {
  clientes.push(cliente);

  return cliente;
}