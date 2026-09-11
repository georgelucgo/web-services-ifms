import express from "express";

import autoresRoutes from "./routes/autores.routes.js";
import livrosRoutes from "./routes/livros.routes.js";

import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use(logger);

app.use(autoresRoutes);
app.use(livrosRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});