import { Router } from "express";

import {
  criarCliente,
  listarClientes
} from "../controllers/clientes.controller.js";

const router = Router();

router.post(
  "/clientes",
  criarCliente
);

router.get(
  "/clientes",
  listarClientes
);

export default router;