import express from 'express';
import multer from 'multer';
import {
    listarPosts,
    criarPost,
    uploadImagem,
    atualizarPost,
} from '../controllers/posts.controller.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ dest: './uploads', storage });

const routes = express.Router();

routes.get('/', listarPosts);
routes.post('/', criarPost);
routes.post('/upload', upload.single('imagem'), uploadImagem);
routes.put('/upload/:id', atualizarPost);

export default routes;
