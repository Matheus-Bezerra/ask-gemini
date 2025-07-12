# NLW Agents - Perguntas & Respostas com IA 🤖

<p align="center">
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#rodar">Rodar o projeto</a> • 
 <a href="#api">API Endpoints</a> •
 <a href="#colaboradores">Colaboradores</a> •
 <a href="#contribuicao">Contribuição</a>
</p>

<p align="center">
    <b>Projeto full stack para criação de salas de perguntas e respostas com inteligência artificial. Permite criar salas, enviar perguntas de texto ou áudio e receber respostas automáticas geradas por IA (com ajuda dos vetores em nosso banco de dados de acordo com a nossa gravação de áudio).</b>
</p>

## 💻 Tecnologias

### Backend
- Node.js
- Fastify
- TypeScript
- Drizzle ORM + PostgreSQL + pgvector
- Google Gemini API (IA)
- Docker

### Frontend
- React 19
- Vite
- TypeScript
- TailwindCSS
- React Query
- React Hook Form

## 🚀 Rodar o projeto

### Pré-requisitos

- [Node.js 18+](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (para o banco de dados)
- [Git](https://git-scm.com/)

### Clonando o projeto

```bash
git clone https://github.com/seu-usuario/nlw-agents.git
cd nlw-agents/agents
```

### Rodando o backend

1. Copie o arquivo `.env.example` para `.env` e preencha as variáveis.
2. Suba o banco de dados com Docker:
   ```bash
   cd server
   docker-compose up -d
   ```
3. Instale as dependências e rode as migrations:
   ```bash
   npm install
   npm db:generate
   npm db:migrate
   ```
4. Rode o servidor:
   ```bash
   npm run dev
   ```

### Rodando o frontend

```bash
cd web
npm install
npm run dev
```

Acesse o frontend em [http://localhost:5173](http://localhost:5173).

## 📍 API Endpoints

| Rota                                 | Descrição                                         |
|--------------------------------------|---------------------------------------------------|
| `GET /rooms`                        | Lista todas as salas                              |
| `POST /rooms`                       | Cria uma nova sala                                |
| `GET /rooms/:roomId/questions`       | Lista perguntas e respostas de uma sala           |
| `POST /rooms/:roomId/questions`      | Cria uma nova pergunta na sala                    |
| `POST /rooms/:roomId/audio`          | Envia um áudio para transcrição e contexto da IA   |

**Exemplo de requisição para criar sala:**
```json
{
  "name": "Sala de dúvidas",
  "description": "Espaço para perguntas sobre IA"
}
```

**Exemplo de resposta:**
```json
{
  "roomId": "uuid-da-sala"
}
```

## 🤝 Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/seu-usuario">
        <img src="https://avatars.githubusercontent.com/u/78742961?s=400&u=c88bb8c0c4246cfed678cc8c5a2bbf043a20ed0e&v=4" width="100px;" alt="Seu Nome"/><br>
        <sub>
          <b>Seu Nome</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📫 Contribuição

1. `git clone https://github.com/seu-usuario/nlw-agents.git`
2. `git checkout -b feature/NOME_DA_FEATURE`
3. Siga o padrão de commits
4. Abra um Pull Request explicando a feature ou correção realizada. Se possível, anexe prints das alterações visuais e aguarde a revisão!

### Documentações úteis

- [📝 Como criar um Pull Request](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
- [💾 Padrão de commits (iuricode)](https://github.com/iuricode/padroes-de-commits)