import type { Request, Response } from "express";
import  {
  obterRecursos,
  obterRecursoPorId,
  cadastrarRecurso,
  atualizarStatusRecurso
} from "../services/recursos.service";

export function listarRecursosController(
  req: Request,
  res: Response
) {
  const status = req.query.status?.toString();
  const tipo = req.query.tipo?.toString();

  const recursos = obterRecursos(status, tipo);

  return res.status(200).json(recursos);
}



export function buscarRecursoController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);
  const recurso = obterRecursoPorId(id);

  if (!recurso) {
    return res.status(404).json({
      mensagem: "Recurso não encontrado",
      status: 404,
      origem: "servico-catalogo"
    });
  }

  return res.status(200).json(recurso);
}

export function criarRecursoController(
  req: Request,
  res: Response
) {
  const recurso = cadastrarRecurso(req.body);

  return res.status(201).json(recurso);
}


export function alterarStatusController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);
  const status = req.body.status;

  const statusValidos = [
    "disponivel",
    "manutencao",
    "indisponivel"
  ];

  if (!statusValidos.includes(status)) {
    return res.status(400).json({
      mensagem: "Status inválido",
      status: 400,
      origem: "servico-catalogo"
    });
  }

  const recurso = atualizarStatusRecurso(id, status);

  if (!recurso) {
    return res.status(404).json({
      mensagem: "Recurso não encontrado",
      status: 404,
      origem: "servico-catalogo"
    });
  }

  return res.status(200).json(recurso);
}