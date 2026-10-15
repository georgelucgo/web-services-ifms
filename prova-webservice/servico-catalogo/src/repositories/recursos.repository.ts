import type { Recurso } from "../models/recurso.ts";


let recursos: Recurso[] = [
  {
    id: 1,
    nome: "Laboratório 3",
    tipo: "laboratorio",
    local: "Bloco B",
    status: "disponivel"
  },
  {
    id: 2,
    nome: "Projetor Epson",
    tipo: "equipamento",
    local: "Sala 12",
    status: "disponivel"
  },
  {
    id: 3,
    nome: "Kit Arduino",
    tipo: "equipamento",
    local: "Laboratório 1",
    status: "manutencao"
  }
];

export function listarRecursos(
  status?: string,
  tipo?: string
): Recurso[] {
  let lista = recursos;

  if (status) {
    lista = lista.filter((recurso) => recurso.status === status);
  }

  if (tipo) {
    lista = lista.filter((recurso) => recurso.tipo === tipo);
  }

  return lista;
}

export function buscarRecursoPorId(
  id: number
): Recurso | undefined {
  return recursos.find((recurso) => recurso.id === id);
}

export function criarRecurso(dados: Omit<Recurso, "id">): Recurso {
  const novoRecurso: Recurso = {
    id: recursos.length + 1,
    nome: dados.nome,
    tipo: dados.tipo,
    local: dados.local,
    status: dados.status
  };

  recursos.push(novoRecurso);

  return novoRecurso;
}


export function alterarStatusRecurso(
  id: number,
  status: Recurso["status"]
): Recurso | undefined {
  const recurso = recursos.find((recurso) => recurso.id === id);

  if (!recurso) {
    return undefined;
  }

  recurso.status = status;

  return recurso;
}