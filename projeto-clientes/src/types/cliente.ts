export type Endereco = {
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export type Cliente = {
  id: number;
  nome: string;
  email: string;
  cep: string;
  endereco: Endereco;
};