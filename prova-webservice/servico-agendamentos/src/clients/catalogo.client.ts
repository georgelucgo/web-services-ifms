import { AppError } from "../errors/AppError";

type RecursoCatalogo = {
  id: number;
  nome: string;
  local: string;
  status: "disponivel" | "manutencao" | "indisponivel";
};

export async function buscarRecursoNoCatalogo(
  id: number
): Promise<RecursoCatalogo> {
  let resposta: Response;

  try {
    resposta = await fetch(
      `http://localhost:3001/recursos/${id}`
    );
  } catch {
    throw new AppError("Falha ao consultar catálogo", 502);
  }

  if (resposta.status === 404) {
    throw new AppError("Recurso não encontrado", 404);
  }

  if (!resposta.ok) {
    throw new AppError("Falha ao consultar catálogo", 502);
  }

  return await resposta.json() as RecursoCatalogo;
}