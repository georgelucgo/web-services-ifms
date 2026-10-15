import type {
  Request,
  Response,
  NextFunction
} from "express";

export function validarRecurso(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { nome, tipo, local, status } = req.body ?? {};

  const tiposValidos = ["laboratorio", "equipamento"];
  const statusValidos = [
    "disponivel",
    "manutencao",
    "indisponivel"
  ];

  if (
    typeof nome !== "string" ||
    nome.trim() === "" ||
    typeof local !== "string" ||
    local.trim() === "" ||
    !tiposValidos.includes(tipo) ||
    !statusValidos.includes(status)
  ) {
    return res.status(400).json({
      mensagem: "Dados do recurso inválidos ou incompletos",
      status: 400,
      origem: "servico-catalogo"
    });
  }

  next();
}