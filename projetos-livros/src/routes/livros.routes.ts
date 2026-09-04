import { Router } from "express";

import {
  listarLivros,
  buscarLivro,
  criarLivro,
  alterarDisponibilidade,
  removerLivro
} from "../controllers/livros.controller.js";

const router = Router();

router.get("/livros", listarLivros);

router.get("/livros/:id", buscarLivro);

router.post("/livros", criarLivro);

router.patch(
  "/livros/:id/disponibilidade",
  alterarDisponibilidade
);

router.delete(
  "/livros/:id",
  removerLivro
);

export default router;