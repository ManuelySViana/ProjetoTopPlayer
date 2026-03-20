import { Router } from "express";
import * as jogosController from "../controllers/jogos.controller.js"

const router = Router();

router.get("/",jogosController.listarJogos);
router.get("/:id",jogosController.buscarJogoPorId);
router.post("/",jogosController.criarJogos);
router.put("/:id", jogosController.atualizarJogos);
router.delete("/:id", jogosController.deletarJogos);

export default router;