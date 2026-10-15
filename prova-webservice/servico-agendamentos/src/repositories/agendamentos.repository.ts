import type { Agendamento } from "../models/agendamento";

let agendamentos: Agendamento[] = [];
let proximoId = 1;

export function listarAgendamentos(
  curso?: string,
  status?: string
): Agendamento[] {
  let lista = agendamentos;

  if (curso) {
    lista = lista.filter((agendamento) => agendamento.curso === curso);
  }

  if (status) {
    lista = lista.filter((agendamento) => agendamento.status === status);
  }

  return lista;
}

export function buscarAgendamentoPorId(
  id: number
): Agendamento | undefined {
  return agendamentos.find((agendamento) => agendamento.id === id);
}

export function criarAgendamento(
  dados: Omit<Agendamento, "id">
): Agendamento {
  const novoAgendamento: Agendamento = {
    id: proximoId,
    solicitante: dados.solicitante,
    curso: dados.curso,
    recursoId: dados.recursoId,
    data: dados.data,
    horario: dados.horario,
    finalidade: dados.finalidade,
    status: dados.status
  };

  proximoId++;

  agendamentos.push(novoAgendamento);

  return novoAgendamento;
}

export function alterarStatusAgendamento(
  id: number,
  status: Agendamento["status"]
): Agendamento | undefined {
  const agendamento = agendamentos.find(
    (agendamento) => agendamento.id === id
  );

  if (!agendamento) {
    return undefined;
  }

  agendamento.status = status;

  return agendamento;
}

export function excluirAgendamento(id: number): boolean {
  const indice = agendamentos.findIndex(
    (agendamento) => agendamento.id === id
  );

  if (indice === -1) {
    return false;
  }

  agendamentos.splice(indice, 1);

  return true;
}