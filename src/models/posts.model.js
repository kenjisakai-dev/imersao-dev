import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js';

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
const db = conexao.db('imersao-instabytes');
const colecao = db.collection('posts');

async function inserirPost(post) {
    return colecao.insertOne(post);
}

async function obterPost(id) {
    const objectId = ObjectId.createFromHexString(id);
    return colecao.findOne({ _id: new ObjectId(objectId) });
}

async function obterPosts() {
    return colecao.find().toArray();
}

async function atualizarPost(id, post) {
    const objectId = ObjectId.createFromHexString(id);
    return colecao.updateOne({ _id: new ObjectId(objectId) }, { $set: post });
}

export default {
    inserirPost,
    obterPost,
    obterPosts,
    atualizarPost,
};
