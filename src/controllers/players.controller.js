import * as playersModel from "../models/players.model.js";

export async function listarPlayers(req, res) {
    const players = await playersModel.listarPlayers();
    res.status(200).json(players);
}

export async function buscarPlayersPorId(req, res) {
    const id = req.params.id;
    const players = await playersModel.buscarPlayersPorId(id);

    if (!players) {
        return res.status(404).json({
            msg: "Player não encontrado"
        });
    }

    res.status(200).json(players);
}

export async function criarPlayers(req, res) {
    const { nickname, plataforma } = req.body;

    if (!nickname || !plataforma) {
        return res.status(400).json({
            msg: "Nickname e plataforma são obrigatórios!"
        });
    }

    const id = await playersModel.criarPlayers({
        nickname,
        plataforma
    });

    return res.status(201).json({
        msg: "Player criado com sucesso"
    });
}

export async function atualizarPlayers(req, res) {
    const id = req.params.id;
    const { nickname, plataforma } = req.body;

    if (!nickname || !plataforma) {
        return res.status(400).json({
            msg: "Nickname e plataforma são obrigatórios!"
        });
    }

    const atualizado = await playersModel.atualizarPlayers(id, {
        nickname,
        plataforma
    });

    if (!atualizado) {
        return res.status(404).json({
            msg: "Player não encontrado"
        });
    }

    res.status(200).json({
        msg: "Player atualizado com sucesso"
    });
}


export async function deletarPlayers(req, res) {
    const id = req.params.id;

    const deletado = await playersModel.deletarPlayers(id);

    if (!deletado) {
        return res.status(404).json({
            msg: "Player não encontrado"
        });
    }

    res.status(200).json({
        msg: "Player deletado com sucesso"
    });
}