import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js';

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection('posts');

    return colecao.find().toArray();
}

export async function inserirPost(post) {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection('posts');

    return colecao.insertOne(post);
}

export async function updatePost(id, post) {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection('posts');

    const objectId = ObjectId.createFromHexString(id);

    return colecao.updateOne({ _id: new ObjectId(objectId) }, { $set: post });
}
