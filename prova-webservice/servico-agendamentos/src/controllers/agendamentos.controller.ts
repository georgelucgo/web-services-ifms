import { Request, Response, NextFunction } from "express";

import {
  obterAgendamentos,
  obterAgendamentoPorId,
  cadastrarAgendamento,
  atualizarStatusAgendamento,
  removerAgendamento
} from "../services/agendamentos.service";

export function listarAgendamentosController(
  req: Request,
  res: Response
) {
  const curso = req.query.curso?.toString();
  const status = req.query.status?.toString();

  const agendamentos = obterAgendamentos(curso, status);

  return res.status(200).json(agendamentos);
}

export function buscarAgendamentoController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);
  const agendamento = obterAgendamentoPorId(id);

  if (!agendamento) {
    return res.status(404).json({
      mensagem: "Agendamento não encontrado",
      status: 404,
      origem: "servico-agendamentos"
    });
  }

  return res.status(200).json(agendamento);
}

export async function criarAgendamentoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const agendamento = await cadastrarAgendamento(req.body);

    return res.status(201).json(agendamento);
  } catch (erro) {
    return next(erro);
  }
}

export function alterarStatusAgendamentoController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);
  const status = req.body?.status;

  if (
    status !== "pendente" &&
    status !== "confirmado" &&
    status !== "cancelado"
  ) {
    return res.status(400).json({
      mensagem: "Status inválido",
      status: 400,
      origem: "servico-agendamentos"
    });
  }

  const agendamento = atualizarStatusAgendamento(id, status);

  if (!agendamento) {
    return res.status(404).json({
      mensagem: "Agendamento não encontrado",
      status: 404,
      origem: "servico-agendamentos"
    });
  }

  return res.status(200).json(agendamento);
}

export function excluirAgendamentoController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);
  const excluido = removerAgendamento(id);

  if (!excluido) {
    return res.status(404).json({
      mensagem: "Agendamento não encontrado",
      status: 404,
      origem: "servico-agendamentos"
    });
  }

  return res.status(204).send();
}