import * as jogosModel from "../models/jogos.model.js";

export async function listarJogos(req, res) {
    const jogos = await jogosModel.listarJogos();
    res.status(200).json(jogos);
}

export async function buscarJogoPorId(req, res) {
    const id = req.params.id;
    const jogos = await jogosModel.buscarJogoPorId(id);

    if (!jogos) {
        return res.status(404).json({
            msg: "Jogo não encontrado"
        });
    }

    res.status(200).json(jogos);
}

export async function criarJogos(req, res) {
    const { nome, genero } = req.body;

    if (!nome || !genero) {
        return res.status(400).json({
            msg: "Nome e gênero são obrigatórios!"
        });
    }

    const id = await jogosModel.criarJogos({
        nome,
        genero
    });

    return res.status(201).json({
        msg: "Jogo criado com sucesso"
    });
}

export async function atualizarJogos(req, res) {
    const id = req.params.id;
    const { nome, genero } = req.body;

    if (!nome || !genero) {
        return res.status(400).json({
            msg: "Nome e gênero são obrigatórios!"
        });
    }

    const atualizado = await jogosModel.atualizarJogos(id, {
        nome,
        genero
    });

    if (!atualizado) {
        return res.status(404).json({
            msg: "Jogo não encontrado"
        });
    }

    res.status(200).json({
        msg: "Jogo atualizado com sucesso"
    });
}


export async function deletarJogos(req, res) {
    const id = req.params.id;

    const deletado = await jogosModel.deletarJogos(id);

    if (!deletado) {
        return res.status(404).json({
            msg: "Jogo não encontrado"
        });
    }

    res.status(200).json({
        msg: "Jogo deletado com sucesso"
    });
}