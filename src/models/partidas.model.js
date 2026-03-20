import { conexao } from "../config/db.js";

export async function listarPartidas(){
    const [resultado] = await conexao.query(
        `SELECT 
            partidas.id,
            jogos.nome AS jogo,
            players.nickname AS player,
            partidas.pontos,
            partidas.data_partida
        FROM partidas
        JOIN jogos ON partidas.jogo_id = jogos.id
        JOIN players ON partidas.player_id = players.id`
    );

    return resultado;
}

export async function criarPartidas({jogo_id, player_id, pontos}) {
    const [resultado] = await conexao.query(
        `INSERT INTO partidas (jogo_id, player_id, pontos)
         VALUES (?,?,?)`, 
        [jogo_id, player_id, pontos]
    );

    return resultado.insertId;
}

export async function deletarPartidas(id) {
    const [resultado] = await conexao.query(
        `DELETE FROM partidas
         WHERE id = ?`,
        [id]
    );

    return resultado.affectedRows;
}