import express from "express";

import autoresRoutes from "./routes/autores.routes.js";
import livrosRoutes from "./routes/livros.routes.js";

const app = express();

app.use(express.json());

app.use(autoresRoutes);
app.use(livrosRoutes);

app.get("/", (request, response) => {
  return response.json({
    mensagem: "API de biblioteca funcionando!"
  });
});

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});