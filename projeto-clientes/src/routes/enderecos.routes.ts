import { Router } from "express";

import {
  buscarEndereco
} from "../controllers/enderecos.controller.js";

const router = Router();

router.get(
  "/enderecos/:cep",
  buscarEndereco
);

export default router;