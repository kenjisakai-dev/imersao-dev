import express from 'express';
import cors from 'cors';
import postsRoutes from './src/routes/posts.routes.js';

const corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200,
};

const app = express();
app.use(express.static('uploads')); // servir arquivos estaticos

app.use(express.json());

app.use(cors(corsOptions));

app.use('/posts', postsRoutes);

app.listen(3000, () => {
    console.log('Servidor escutando na porta 3000');
});
