import { Router } from "express";

import {
  listarAutores,
  criarAutor
} from "../controllers/autores.controllers.js";

const router = Router();

router.get("/autores", listarAutores);

router.post("/autores", criarAutor);

export default router;