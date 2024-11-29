import fs from 'fs';
import { ObjectId } from 'mongodb';
import postsModel from '../models/posts.model.js';
import gerarDescricaoGemini from '../services/gemini.service.js';

async function inserirPost(req, res) {
    try {
        const file = req.file;

        if (!file || !file.mimetype.match(/\/png$/i)) {
            throw new Error('Arquivo do tipo png é obrigatório');
        }

        const _id = new ObjectId();

        const imgBuffer = fs.readFileSync(`uploads/${file.originalname}`);
        const { descricao, alt } = await gerarDescricaoGemini(imgBuffer);
        const imgUrl = `http://localhost:3000/${_id}.png`;

        const pathImagem = `uploads/${_id}.png`;
        fs.renameSync(req.file.path, pathImagem);

        const body = { _id, descricao, imgUrl, alt };

        const post = await postsModel.inserirPost(body);

        return res.status(201).json(post);
    } catch (erro) {
        console.error(erro.message);
        return res.status(400).json({ erro: erro.message });
    }
}

async function obterPost(req, res) {
    try {
        const { id } = req.params;

        const post = await postsModel.obterPost(id);
        return res.status(200).json(post);
    } catch (erro) {
        console.error(erro.message);
        return res.status(400).json({ erro: erro.message });
    }
}

async function obterPosts(req, res) {
    try {
        const posts = await postsModel.obterPosts();
        return res.status(200).json(posts);
    } catch (erro) {
        console.error(erro.message);
        return res.status(400).json({ erro: erro.message });
    }
}

async function atualizarPost(req, res) {
    try {
        const { id } = req.params;
        const file = req.file;

        if (!id || !file.mimetype.match(/\/png$/i)) {
            throw new Error('ID é arquivo do tipo png são obrigatórios');
        }

        const verificaPost = await postsModel.obterPost(id);

        if (!verificaPost) {
            return res.status(404).json({ messagem: 'Post não encontrado' });
        }

        const pathImagem = `uploads/${id}.png`;
        fs.renameSync(req.file.path, pathImagem);

        const imgUrl = `http://localhost:3000/${id}.png`;
        const imgBuffer = fs.readFileSync(pathImagem);
        const { descricao, alt } = await gerarDescricaoGemini(imgBuffer);

        const body = {
            descricao,
            imgUrl,
            alt,
        };

        const post = await postsModel.atualizarPost(id, body);

        return res.status(200).json(post);
    } catch (erro) {
        console.error(erro.message);
        return res.status(400).json({ erro: erro.message });
    }
}

export default {
    inserirPost,
    obterPost,
    obterPosts,
    atualizarPost,
};
