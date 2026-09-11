import express from "express";

interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: string;
  status: string;
  criadoEm: string;
}

let chamados: Chamado[] = [];

const prioridades = ["baixa", "media", "alta"];
const statusValidos = ["aberto", "em_andamento", "fechado"];

const app = express();

app.use(express.json());


app.get("/chamados", (request, response) => {

  const { status, prioridade } = request.query;

  let resultado = chamados;

  if (status) {
    resultado = resultado.filter(
      chamado => chamado.status === status
    );
  }

  if (prioridade) {
    resultado = resultado.filter(
      chamado => chamado.prioridade === prioridade
    );
  }

  return response.json(resultado);
});



app.get("/chamados/:id", (request, response) => {

  const id = Number(request.params.id);

  const chamado = chamados.find(
    chamado => chamado.id === id
  );

  if (!chamado) {
    return response.status(404).json({
      mensagem: "Chamado não encontrado"
    });
  }

  return response.json(chamado);
});



app.post("/chamados", (request, response) => {

  const { titulo, descricao, prioridade } = request.body;

  if (!titulo) {
    return response.status(400).json({
      mensagem: "Título obrigatório"
    });
  }

  if (!descricao) {
    return response.status(400).json({
      mensagem: "Descrição obrigatória"
    });
  }

  if (!prioridades.includes(prioridade)) {
    return response.status(400).json({
      mensagem: "Prioridade inválida"
    });
  }

  const novoChamado: Chamado = {
    id: chamados.length + 1,
    titulo,
    descricao,
    prioridade,
    status: "aberto",
    criadoEm: new Date().toISOString()
  };

  chamados.push(novoChamado);

  return response.status(201).json(novoChamado);
});


app.put("/chamados/:id", (request, response) => {

  const id = Number(request.params.id);

  const chamado = chamados.find(
    chamado => chamado.id === id
  );

  if (!chamado) {
    return response.status(404).json({
      mensagem: "Chamado não encontrado"
    });
  }

  const { titulo, descricao, prioridade } = request.body;

  if (!titulo) {
    return response.status(400).json({
      mensagem: "Título obrigatório"
    });
  }

  if (!descricao) {
    return response.status(400).json({
      mensagem: "Descrição obrigatória"
    });
  }

  if (!prioridades.includes(prioridade)) {
    return response.status(400).json({
      mensagem: "Prioridade inválida"
    });
  }

  chamado.titulo = titulo;
  chamado.descricao = descricao;
  chamado.prioridade = prioridade;

  return response.json(chamado);
});



app.patch("/chamados/:id/status", (request, response) => {

  const id = Number(request.params.id);

  const chamado = chamados.find(
    chamado => chamado.id === id
  );

  if (!chamado) {
    return response.status(404).json({
      mensagem: "Chamado não encontrado"
    });
  }

  const { status } = request.body;

  if (!statusValidos.includes(status)) {
    return response.status(400).json({
      mensagem: "Status inválido"
    });
  }

  chamado.status = status;

  return response.json(chamado);
});



app.delete("/chamados/:id", (request, response) => {

  const id = Number(request.params.id);

  const indice = chamados.findIndex(
    chamado => chamado.id === id
  );

  if (indice === -1) {
    return response.status(404).json({
      mensagem: "Chamado não encontrado!"
    });
  }

  const chamadoRemovido = chamados.splice(indice, 1);

  return response.json({
    mensagem: "Chamado excluído com sucesso!",
    chamado: chamadoRemovido[0]
  });
});


app.get("/", (request, response) => {

  return response.json({
    mensagem: "API de chamados funcionando!"
  });

});


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
})
