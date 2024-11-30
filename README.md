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
    É um framework para Node.js utilizado para facilitar a criação da API

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

## 🔛 Como consultar os endpoints

### **Criar um novo post**

`POST /posts`

Endpoint responsável por criar um novo post enviando uma imagem no formato **PNG** através de um `form-data`. O endpoint utiliza a imagem enviada para gerar uma descrição e alt automaticamente utilizando a IA do Gemini.

#### **Parâmetros da Requisição**

| **Tipo**  | **Parâmetro** | **Descrição**          | **Obrigatório** |
| --------- | ------------- | ---------------------- | --------------- |
| form-data | `imagem`      | Arquivo no formato PNG | Sim             |

#### **Respostas da Requisição**

| **Código** | **Status**  | **Descrição**                 |
| ---------- | ----------- | ----------------------------- |
| 201        | Created     | O post foi criado com sucesso |
| 400        | Bad Request | Houve um erro ao criar o post |

#### **Resposta 201 do endpoint**

```json
{
    "acknowledged": true,
    "insertedId": "6748f4350db76c22d403d63d"
}
```

---

### **Listar todos os posts**

`GET /posts`

Endpoint responsável por listar todos os posts.

#### **Respostas da Requisição**

| **Código** | **Status**  | **Descrição**                       |
| ---------- | ----------- | ----------------------------------- |
| 200        | Ok          | Os posts foram listados com sucesso |
| 400        | Bad Request | Houve um erro ao listar os posts    |

#### **Resposta 200 do endpoint**

```json
[
    {
        "_id": "674a3e15975fda8af6f13cee",
        "descricao": "Vale verdejante sob céu tempestuoso. Rio serpenteia pelas colinas ondulantes. Paisagem dramática e serena.\n",
        "imgUrl": "http://localhost:3000/674a3e15975fda8af6f13cee.png",
        "alt": "Aqui está uma sugestão de alt text em português do Brasil para a imagem, com no máximo 10 palavras:\n\n\"Vale verdejante com rio sinuoso sob céu tempestuoso.\"\n"
    },
    {
        "_id": "674a3e24975fda8af6f13cef",
        "descricao": "Nissan Skyline R34 GT-R cinza-escuro em alta velocidade em uma pista de corrida.",
        "imgUrl": "http://localhost:3000/674a3e24975fda8af6f13cef.png",
        "alt": "Aqui está uma sugestão para a alt text em português brasileiro com no máximo 10 palavras:\n\nNissan Skyline R34 GT-R em alta velocidade na pista.\n"
    }
]
```

---

### **Obter um post**

`GET /posts/:id`

Endpoint responsável por obter um post.

#### **Parâmetros da Requisição**

| **Tipo**          | **Parâmetro** | **Descrição** | **Obrigatório** |
| ----------------- | ------------- | ------------- | --------------- |
| parâmetro de rota | `id`          | ID do post    | Sim             |

#### **Respostas da Requisição**

| **Código** | **Status**  | **Descrição**                         |
| ---------- | ----------- | ------------------------------------- |
| 200        | Ok          | O post foi obtido com sucesso         |
| 400        | Bad Request | Houve um erro ao obter o post         |

#### **Resposta 200 do endpoint**

```json
{
    "_id": "674a3e24975fda8af6f13cef",
    "descricao": "Nissan Skyline R34 GT-R cinza-escuro em alta velocidade em uma pista de corrida.",
    "imgUrl": "http://localhost:3000/674a3e24975fda8af6f13cef.png",
    "alt": "Aqui está uma sugestão para a alt text em português brasileiro com no máximo 10 palavras:\n\nNissan Skyline R34 GT-R em alta velocidade na pista.\n"
}
```

---

### **Atualizar um post**

`PATCH /posts/:id`

Endpoint responsável por atualizar um post. O endpoint utiliza a imagem enviada para gerar uma nova descrição e alt automaticamente utilizando a IA do Gemini.

#### **Parâmetros da Requisição**

| **Tipo**          | **Parâmetro** | **Descrição**          | **Obrigatório** |
| ----------------- | ------------- | ---------------------- | --------------- |
| parâmetro de rota | `id`          | ID do post             | Sim             |
| form-data         | `imagem`      | Arquivo no formato PNG | Sim             |

#### **Respostas da Requisição**

| **Código** | **Status**  | **Descrição**                             |
| ---------- | ----------- | ----------------------------------------- |
| 200        | Ok          | O post foi obtido com sucesso             |
| 400        | Bad Request | Houve um erro ao atualizar o post         |
| 404        | Not Found   | O post não foi encontrado                 |

#### **Resposta 200 do endpoint**

```json
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```
