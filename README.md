# Projeto Imersão DEV - Backend com Google Gemini AI

Este projeto foi desenvolvido como parte da Imersão DEV da Alura, com foco no backend. Ele integra a IA ao backend, aproveitando as funcionalidades avançadas da IA Google Gemini.

## 🚀 Tecnologias Utilizadas

-   **`@google/generative-ai`**  
    Utilizado para integrar a API de inteligência artificial generativa do Google (Gemini) para gerar descrição da imagem

-   **`cors`**  
    Utilizado para controlar quais páginas web podem fazer requisições para a API

-   **`dotenv`**  
    Utilizado para carregar variáveis de ambiente a partir de um arquivo `.env` para a aplicação

-   **`express`**  
    É um framework para Node.js utilizado que facilitar a criação da API

-   **`mongodb`**  
    É uma biblioteca utilizada para permitir a interação com o banco de dados MongoDB

-   **`multer`**  
    Utilizado para lidar com uploads dos arquivos `.png` recebidos via formulário HTTP do tipo `multipart/form-data` da requisição

## 🛠️ Como executar o projeto

1. Instale as dependências do projeto

    ```sh
    npm install
    ```

2. Criação das variáveis de ambiente

    1. Crie um arquivo chamado `.env` na raiz do projeto
    2. Declare a variável de ambiente `"STRING_CONEXAO"` com a string de conexão do MongoDB
        - Crie uma conta no mongoDB e obtenha a string de conexão [Aqui](https://www.youtube.com/watch?v=6b3YH0kK3ig&ab_channel=SamucaTutoriais)
    3. Declare a variável de ambiente `"GEMINI_API_KEY"` com a chave da API do Google AI Studio
        - Gere a sua API Key no Google AI Studio [Aqui](https://aistudio.google.com/app/apikey?utm_source=website&utm_medium=referral&utm_campaign=Alura-dev-backend-immersion&utm_content=)

3. Inicie o projeto Localmente

    ```sh
    npm run dev
    ```
