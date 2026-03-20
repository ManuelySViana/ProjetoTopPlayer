import * as partidasModel from "../models/partidas.model.js";

export async function listarPartidas(req, res) {
    const partidas = await partidasModel.listarPartidas();
    res.status(200).json(partidas);
}

export async function criarPartidas(req, res) {
    const { jogo_id, player_id, pontos } = req.body;

    if (!jogo_id || !player_id || !pontos) {
        return res.status(400).json({
            msg: "Jogo, player e pontos são obrigatórios!"
        });
    }

    const id = await partidasModel.criarPartidas({
        jogo_id,
        player_id,
        pontos
    });

    return res.status(201).json({
        msg: "Partida criada com sucesso"
    });
}

export async function deletarPartidas(req, res) {
    const id = req.params.id;

    const deletado = await partidasModel.deletarPartidas(id);

    if (!deletado) {
        return res.status(404).json({
            msg: "Partida não encontrada"
        });
    }

    res.status(200).json({
        msg: "Partida deletada com sucesso"
    });
}