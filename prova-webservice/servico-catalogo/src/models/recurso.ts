export type Recurso = {
  id: number;
  nome: string;
  tipo: "laboratorio" | "equipamento";
  local: string;
  status: "disponivel" | "manutencao" | "indisponivel";
};