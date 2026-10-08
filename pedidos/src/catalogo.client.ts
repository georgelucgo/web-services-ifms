export interface ProdutoRemoto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

const CATALOGO_URL = process.env.CATALOGO_URL ?? 'http://localhost:3001';
const TIMEOUT_MS = 2000;

export async function buscarProduto(id: number): Promise<ProdutoRemoto> {
  try {
    const response = await fetch(`${CATALOGO_URL}/produtos/${id}`, {
      signal: AbortSignal.timeout(TIMEOUT_MS)
    });

    if (response.status === 404) {
      throw new AppError(404, 'Produto inexistente');
    }

    if (!response.ok) {
      throw new AppError(502, 'Catálogo temporariamente indisponível');
    }

    const produto = (await response.json()) as ProdutoRemoto;
    return produto;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new AppError(504, 'Catálogo temporariamente indisponível');
    }

    throw new AppError(502, 'Catálogo temporariamente indisponível');
  }
}
