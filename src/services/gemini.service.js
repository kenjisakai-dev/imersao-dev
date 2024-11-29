import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export default async function gerarDescricaoGemini(imageBuffer) {
    const promptDescricao =
        'Gere uma descrição em pt-br para a seguinte imagem';
    const promptAltImagem = 'Gere uma alt em pt-br para a seguinte imagem';

    try {
        const imagem = {
            inlineData: {
                data: imageBuffer.toString('base64'),
                mimeType: 'image/png',
            },
        };

        let respostaDescricao = await model.generateContent([
            promptDescricao,
            imagem,
        ]);
        let respostaAlt = await model.generateContent([
            promptAltImagem,
            imagem,
        ]);

        if (!respostaDescricao || !respostaAlt) {
            return 'Alt-text não disponível.';
        }

        const resposta = {
            descricao: respostaDescricao.response.text(),
            alt: respostaAlt.response.text(),
        };

        return resposta;
    } catch (erro) {
        console.error('Erro ao obter alt-text', erro.message, erro);
        throw new Error('Erro ao obter alt-text');
    }
}
