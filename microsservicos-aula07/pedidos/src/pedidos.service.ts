import { buscarProduto, AppError } from './catalogo.client.js';

interface CriarPedidoInput {
  produtoId: number;
  quantidade: number;
}

export async function criarPedido(input: CriarPedidoInput) {
  const produto = await buscarProduto(input.produtoId);

  if (input.quantidade > produto.estoque) {
    throw new AppError(409, 'Estoque insuficiente');
  }

  const total = Number((produto.preco * input.quantidade).toFixed(2));

  return {
    produtoId: produto.id,
    produto: produto.nome,
    quantidade: input.quantidade,
    precoUnitario: produto.preco,
    total
  };
}
