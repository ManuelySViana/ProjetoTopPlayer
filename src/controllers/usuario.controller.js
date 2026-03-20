import * as usuarioModel from "../models/usuario.model.js";
import crypto from "crypto";

export async function listar(req,res) {
    const usuario = await usuarioModel.listarUsuarios();
    res.status(200).json(usuario);
}

export async function buscarPorId(req,res) {
    const id = req.params.id;
    const usuario = await usuarioModel.buscarUsuarioPorId(id);

    if(!usuario){
        return res.status(404).json({msg: "Usuário não encontrado"});
    }
    res.status(200).json(usuario);
}

export async function criar(req,res) {
    const {nome, email, senha} =req.body;

    if(!nome || !email || !senha){
        return res.status(404).json({msg: "Nome, email e senha é obrigatório"})
    }

    const senha_hash = crypto
        .createHash("sha256")
        .update(senha)
        .digest("hex");

    const id = await usuarioModel.criarUsuario(
        {nome, email, senha_hash}
    )

    return res.status(201).json({msg: "Usuário criado com sucesso"})
}

export async function login(req,res) {
    const {email, senha} = req.body;

    if(!email || !senha){
        return res.status(400).json({msg: "Email e senha são obrigatórios"})
    }

    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
    if(!usuario){
        return res.status(401).json({msg: "Credenciais inválida"})
    }

    const senha_hash = crypto
        .createHash("sha256")
        .update(senha)
        .digest("hex");
    if(senha_hash !== usuario.senha_hash){
        return res.status(401).json({msg: "Credenciais inválida"})
    }

    const token = crypto.randomBytes(24).toString("hex");

    return res.status(200).json({
        msg: "Login realizado com sucesso",
        token,
        usuario :{
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome
        }
    })
}

export async function atualizarUsuarios(req, res) {
    const id = req.params.id;
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({
            msg: "Nome e email são obrigatórios!"
        });
    }

    const atualizado = await usuarioModel.atualizarUsuarios(id, {
        nome,
        email
    });

    if (!atualizado) {
        return res.status(404).json({
            msg: "Usuario não encontrado"
        });
    }

    res.status(200).json({
        msg: "Usuario atualizado com sucesso"
    });
}

export async function deletarUsuarios(req, res) {
    const id = req.params.id;

    const deletado = await usuarioModel.deletarUsuarios(id);

    if (!deletado) {
        return res.status(404).json({
            msg: "Usuario não encontrado"
        });
    }

    res.status(200).json({
        msg: "Usuario deletado com sucesso"
    });
}