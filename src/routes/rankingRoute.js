import express from "express";
import { Geral, PorJogo } from "../controllers/rankingController.js";

const router = express.Router();

router.get("/geral", Geral);
router.get("/jogo/:id", PorJogo);

export default router;