import express from "express";

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

let produtos: Produto[] = [
  { id: 1, nome: "Teclado", preco: 150 },
  { id: 2, nome: "Mouse", preco: 80 },
  { id: 3, nome: "Monitor", preco: 900 }
];

const app = express();

app.use(express.json());



app.get("/produtos", (request, response) => {
  return response.json(produtos);
});



app.get("/produtos/:id", (request, response) => {
  const id = Number(request.params.id);

  const produto = produtos.find(
    produto => produto.id === id
  );

  if (!produto) {
    return response.status(404).json({
      mensagem: "Produto não encontrado!"
    });
  }

  return response.json(produto);
});



app.post("/produtos", (request, response) => {
  const { id, nome, preco } = request.body;

  if (!id) {
    return response.status(400).json({
      mensagem: "ID obrigatório"
    });
  }

  if (!nome) {
    return response.status(400).json({
      mensagem: "Nome obrigatório"
    });
  }

  if (preco === undefined || preco < 0) {
    return response.status(400).json({
      mensagem: "Preço inválido"
    });
  }

  const novoProduto: Produto = {
    id,
    nome,
    preco
  };

  produtos.push(novoProduto);

  return response.status(201).json(novoProduto);
});




app.delete("/produtos/:id", (request, response) => {
  const id = Number(request.params.id);

  const indice = produtos.findIndex(
    produto => produto.id === id
  );

  if (indice === -1) {
    return response.status(404).json({
      mensagem: "Produto não encontrado!"
    });
  }

  const produtoRemovido = produtos.splice(indice, 1);

  return response.json(produtoRemovido);
});



app.put("/produtos/:id", (request, response) => {
  const id = Number(request.params.id);

  const produto = produtos.find(
    produto => produto.id === id
  );

  if (!produto) {
    return response.status(404).json({
      mensagem: "Produto não encontrado!"
    });
  }

  const { nome, preco } = request.body;

  if (!nome || preco === undefined || preco < 0) {
    return response.status(400).json({
      mensagem: "Nome inválido"
    });
  }


  if(preco < 0){
    return response.status(400).json({
      mensagem: "Preço negativo"
    });
  }

  if(preco === undefined){
    return response.status(400).json({
      mensagem: "Preço inválido"
    });
  }

  produto.nome = nome;
  produto.preco = preco;

  return response.json(produto);
});



app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});