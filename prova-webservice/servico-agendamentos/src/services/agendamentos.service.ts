import {
  listarAgendamentos,
  buscarAgendamentoPorId,
  criarAgendamento,
  alterarStatusAgendamento,
  excluirAgendamento
} from "../repositories/agendamentos.repository";


import { buscarRecursoNoCatalogo } from "../clients/catalogo.client";
import { AppError } from "../errors/AppError";
import type { Agendamento } from "../models/agendamento";


export function obterAgendamentos(curso?: string, status?: string) {
  return listarAgendamentos(curso, status);
}

export function obterAgendamentoPorId(id: number) {
  return buscarAgendamentoPorId(id);
}

export async function cadastrarAgendamento(
  dados: Omit<Agendamento, "id" | "status">
) {
  const recurso = await buscarRecursoNoCatalogo(dados.recursoId);

  if (recurso.status !== "disponivel") {
    throw new AppError(
      "Recurso não está disponível para reserva",
      409
    );
  }

  const agendamento = criarAgendamento({
    solicitante: dados.solicitante,
    curso: dados.curso,
    recursoId: dados.recursoId,
    data: dados.data,
    horario: dados.horario,
    finalidade: dados.finalidade,
    status: "confirmado"
  });

  return {
    id: agendamento.id,
    solicitante: agendamento.solicitante,
    curso: agendamento.curso,
    recurso: {
      id: recurso.id,
      nome: recurso.nome,
      local: recurso.local
    },
    data: agendamento.data,
    horario: agendamento.horario,
    status: agendamento.status
  };
}

export function atualizarStatusAgendamento(
  id: number,
  status: Agendamento["status"]
) {
  return alterarStatusAgendamento(id, status);
}

export function removerAgendamento(id: number) {
  return excluirAgendamento(id);
}