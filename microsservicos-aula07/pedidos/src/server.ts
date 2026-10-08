import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { AppError } from './catalogo.client.js';
import { criarPedido } from './pedidos.service.js';

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT ?? 3000);

app.post('/pedidos', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { produtoId, quantidade } = req.body ?? {};

    if (!Number.isInteger(produtoId) || !Number.isInteger(quantidade) || quantidade <= 0) {
      return res.status(400).json({
        mensagem: 'produtoId e quantidade devem ser inteiros positivos'
      });
    }

    const pedido = await criarPedido({ produtoId, quantidade });
    return res.status(201).json(pedido);
  } catch (error) {
    next(error);
  }
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ mensagem: error.message });
  }

  console.error(error);
  return res.status(500).json({ mensagem: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  console.log(`Pedidos rodando em http://localhost:${PORT}`);
});
