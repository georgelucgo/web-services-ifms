import {
  listarRecursos,
  buscarRecursoPorId,
  criarRecurso,
  alterarStatusRecurso
} from "../repositories/recursos.repository";

import type { Recurso } from "../models/recurso";


export function obterRecursos(status?: string, tipo?: string) {
  return listarRecursos(status, tipo);
}

export function obterRecursoPorId(id: number) {
  return buscarRecursoPorId(id);
}


export function cadastrarRecurso(
  dados: Omit<Recurso, "id">
) {
  return criarRecurso(dados);
}

export function atualizarStatusRecurso(
  id: number,
  status: Recurso["status"]
) {
  return alterarStatusRecurso(id, status);
}