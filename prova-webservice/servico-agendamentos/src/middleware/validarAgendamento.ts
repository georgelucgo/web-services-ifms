import type {
  Request,
  Response,
  NextFunction
} from "express";

export function validarAgendamento(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    solicitante,
    curso,
    recursoId,
    data,
    horario,
    finalidade
  } = req.body ?? {};

  if (
    typeof solicitante !== "string" ||
    solicitante.trim() === "" ||
    typeof curso !== "string" ||
    curso.trim() === "" ||
    typeof recursoId !== "number" ||
    !Number.isInteger(recursoId) ||
    recursoId <= 0 ||
    typeof data !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data) ||
    typeof horario !== "string" ||
    horario.trim() === "" ||
    typeof finalidade !== "string" ||
    finalidade.trim() === ""
  ) {
    return res.status(400).json({
      mensagem: "Dados do agendamento inválidos ou incompletos",
      status: 400,
      origem: "servico-agendamentos"
    });
  }

  next();
}