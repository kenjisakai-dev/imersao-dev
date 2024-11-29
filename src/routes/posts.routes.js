import express from 'express';
import multer from 'multer';
import postsController from '../controllers/posts.controller.js';

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

routes.post('/', upload.single('imagem'), postsController.inserirPost);
routes.get('/:id', postsController.obterPost);
routes.get('/', postsController.obterPosts);
routes.patch('/:id', upload.single('imagem'), postsController.atualizarPost);

export default routes;
