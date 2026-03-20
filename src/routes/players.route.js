import { Router } from "express";
import * as playersController from "../controllers/players.controller.js"

const router = Router();

router.get("/",playersController.listarPlayers);
router.get("/:id",playersController.buscarPlayersPorId);
router.post("/",playersController.criarPlayers);
router.put("/:id", playersController.atualizarPlayers);
router.delete("/:id", playersController.deletarPlayers);

export default router;