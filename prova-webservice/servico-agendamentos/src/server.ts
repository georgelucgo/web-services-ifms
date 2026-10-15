import express from "express";
import agendamentosRoutes from "./routes/agendamentos.routes";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";

const app = express();
app.use(logger);


app.use(express.json());

app.get("/health", (_req, res) => {
  return res.status(200).json({
    servico: "servico-agendamentos",
    status: "ok"
  });
});

app.use("/agendamentos", agendamentosRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Agendamentos rodando em http://localhost:3000");
});

