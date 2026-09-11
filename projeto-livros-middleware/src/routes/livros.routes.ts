import { Router } from "express";

import {
  listarLivros,
  buscarLivro,
  criarLivro,
  alterarDisponibilidade,
  removerLivro
} from "../controllers/livros.controller.js";

import { validarLivro } from "../middlewares/validarLivro.js";
import { verificarToken } from "../middlewares/verificarToken.js";


const router = Router();

router.get("/livros", listarLivros);

router.get("/livros/:id", buscarLivro);

router.post(
  "/livros",
  validarLivro,
  criarLivro
);
router.patch(
  "/livros/:id/disponibilidade",
  alterarDisponibilidade
);

router.delete(
  "/livros/:id",
  verificarToken,
  removerLivro
);

export default router;