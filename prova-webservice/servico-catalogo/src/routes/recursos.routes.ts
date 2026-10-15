import { Router } from "express";
import {
  listarRecursosController,
  buscarRecursoController,
  criarRecursoController,
  alterarStatusController
} from "../controllers/recursos.controller";

import { verificarToken } from "../middlewares/verificarToken";
import { validarRecurso } from "../middlewares/validarRecurso";

const router = Router();

router.get("/", listarRecursosController);
router.get("/:id", buscarRecursoController);
router.post("/", validarRecurso, criarRecursoController);
router.patch("/:id/status",verificarToken,alterarStatusController);


export default router;