import fs from 'fs';
import {
    getTodosPosts,
    inserirPost,
    updatePost,
} from '../models/posts.model.js';
import gerarDescricaoGemini from '../services/gemini.service.js';

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    return res.status(200).json(posts);
}

export async function criarPost(req, res) {
    const body = req.body;

    try {
        const post = await inserirPost(body);
        return res.status(201).json(post);
    } catch (erro) {
        console.error(erro.message);
        return res.status(400).json({ erro: erro.message });
    }
}

export async function uploadImagem(req, res) {
    const body = {
        descricao: '',
        imgUrl: req.file.originalname,
        alt: '',
    };

    try {
        const post = await inserirPost(body);

        const pathImagem = `uploads/${post.insertedId}.png`;
        fs.renameSync(req.file.path, pathImagem);

        return res.status(201).json(post);
    } catch (erro) {
        console.error(erro.message);
        return res.status(400).json({ erro: erro.message });
    }
}

export async function atualizarPost(req, res) {
    const { id } = req.params;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoGemini(imgBuffer);

        const body = {
            descricao: descricao,
            imgUrl: urlImagem,
            alt: req.body.alt,
        };

        const post = await updatePost(id, body);
        return res.status(200).json(post);
    } catch (erro) {
        console.error(erro.message);
        return res.status(400).json({ erro: erro.message });
    }
}
