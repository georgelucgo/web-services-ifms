import 'dotenv/config';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT ?? 3001);

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

const produtos: Produto[] = [
  { id: 1, nome: 'Teclado Mecânico', preco: 249.90, estoque: 10 },
  { id: 2, nome: 'Mouse Gamer', preco: 129.90, estoque: 5 },
  { id: 3, nome: 'Headset', preco: 199.90, estoque: 3 }
];

app.get('/produtos/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(404).json({ mensagem: 'Produto inexistente' });
  }

  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto inexistente' });
  }

  return res.status(200).json(produto);
});

app.listen(PORT, () => {
  console.log(`Catálogo rodando em http://localhost:${PORT}`);
});
