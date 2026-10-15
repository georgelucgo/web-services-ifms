import express from "express";
import recursosRoutes from "./routes/recursos.routes";
import { logger } from "../../servico-catalogo/src/middlewares/logger";

const app = express();
app.use(logger);

app.use(express.json());

app.get("/health", (_req, res) => {
  return res.status(200).json({
    servico: "servico-catalogo",
    status: "ok"
  });
});

app.use("/recursos", recursosRoutes);

app.listen(3001, () => {
  console.log("Catálogo rodando em http://localhost:3001");
});