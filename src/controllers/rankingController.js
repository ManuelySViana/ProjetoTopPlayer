import * as rankingModel from "../models/rankingModel.js";

export async function Geral(req, res) {
    try {
        const { limite } = req.query;

        const ranking = await rankingModel.rankingGeral(limite);

        res.status(200).json(ranking);
    } catch (error) {
        console.error("Erro no ranking geral:", error);
        res.status(500).json({
            msg: "Erro ao buscar ranking geral"
        });
    }
}

export async function PorJogo(req, res) {
    try {
        const id = req.params.id;
        const { limite } = req.query;

        const ranking = await rankingModel.rankingPorJogo(id, limite);

        res.status(200).json(ranking);
    } catch (error) {
        console.error("Erro no ranking por jogo:", error);
        res.status(500).json({
            msg: "Erro ao buscar ranking por jogo"
        });
    }
}