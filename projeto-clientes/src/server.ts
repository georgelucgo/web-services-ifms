import express from "express";

import enderecosRoutes
  from "./routes/enderecos.routes.js";

import clientesRoutes
  from "./routes/clientes.routes.js";

import { errorHandler }
  from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use(enderecosRoutes);

app.use(clientesRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log(
    "API rodando em http://localhost:3000"
  );
});