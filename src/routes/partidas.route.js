import { Router } from "express";
import * as partidasController from "../controllers/partidas.controller.js"

const router = Router();

router.get("/",partidasController.listarPartidas);
router.post("/",partidasController.criarPartidas);
router.delete("/:id", partidasController.deletarPartidas);

export default router;