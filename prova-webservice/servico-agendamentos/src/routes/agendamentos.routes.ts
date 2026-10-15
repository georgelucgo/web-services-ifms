import { Router } from "express";

import {
  listarAgendamentosController,
  buscarAgendamentoController,
  criarAgendamentoController,
  alterarStatusAgendamentoController,
  excluirAgendamentoController
} from "../controllers/agendamentos.controller";

import { validarAgendamento } from "../middleware/validarAgendamento";
import { verificarToken } from "../middleware/verificarToken";


const router = Router();

router.get("/", listarAgendamentosController);
router.get("/:id", buscarAgendamentoController);
router.post("/", validarAgendamento,criarAgendamentoController);
router.patch("/:id/status",verificarToken,alterarStatusAgendamentoController);

router.delete("/:id",verificarToken,excluirAgendamentoController);


export default router;