# 📚 Clube do Livro - Backend API

API REST desenvolvida para o projeto integrador do Clube do Livro, uma plataforma educacional focada em literatura brasileira e preparação para vestibulares.

## 👥 Autores

- **Kaike**
- **Thales**
- **Jennifer**

## 📋 Sobre o Projeto

Este backend fornece uma API completa para gerenciar conteúdo literário, incluindo livros, videoaulas, simulados, reviews e informações sobre a equipe. O sistema é bilíngue (Português/Inglês) e integrado com Supabase para armazenamento de dados e arquivos.

### 🎯 Principais Funcionalidades

- **Gestão de Livros**: CRUD completo com informações detalhadas (autor, personagens, contexto histórico, análise literária)
- **Conteúdo Vestibular**: Análises críticas, interpretações, temas de redação e frequência em vestibulares (FUVEST, UNICAMP, ENEM)
- **Videoaulas**: Gerenciamento de conteúdo educacional em vídeo
- **Simulados**: Sistema completo de questões e alternativas para prática
- **Reviews**: Sistema de avaliações e comentários sobre livros
- **Curiosidades e Dicas**: Conteúdo complementar para enriquecer o aprendizado
- **Equipe**: Informações sobre os membros do projeto
- **Upload de Arquivos**: Gerenciamento de fotos e arquivos via Supabase Storage
- **Integração Externa**: Consumo de APIs de bibliotecas externas

## 🛠️ Tecnologias Utilizadas

- **Node.js** com **Express 5.x**
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Supabase** - Backend as a Service (Database + Storage)
- **Multer** - Upload de arquivos
- **Sharp** - Processamento de imagens
- **CORS** - Controle de acesso entre origens
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
BackEnd--Projeto-Integrador/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── seed.js                # Dados iniciais
├── src/
│   ├── controllers/           # Lógica de negócio
│   │   ├── livroController.js
│   │   ├── reviewsController.js
│   │   ├── videoAulaController.js
│   │   ├── simuladoController.js
│   │   ├── questaoController.js
│   │   ├── alternativaController.js
│   │   ├── curiosidadeController.js
│   │   ├── dicaVestibularController.js
│   │   ├── conteudoVestibularController.js
│   │   ├── equipeController.js
│   │   ├── fotoControllerEquipe.js
│   │   ├── fotoControllerLivro.js
│   │   ├── arquivoControllerequipe.js
│   │   ├── arquivoControllerLivro.js
│   │   └── integrarApiController.js
│   ├── models/                # Modelos de dados
│   ├── routes/                # Definição de rotas
│   ├── lib/                   # Utilitários e helpers
│   │   ├── middlewares/       # Middlewares (autenticação, etc)
│   │   └── helpers/           # Funções auxiliares
│   └── server.js              # Configuração do servidor
├── uploads/                   # Arquivos temporários de upload
├── .env                       # Variáveis de ambiente
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL
- Conta no Supabase (opcional, mas recomendado)

### 1. Clone o repositório

```bash
git clone https://github.com/Jenniferkss/BackEnd--Projeto-Integrador.git
cd BackEnd--Projeto-Integrador
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000

# Conexão com banco de dados via pooling (Supabase)
DATABASE_URL="postgresql://usuario:senha@host:porta/database?pgbouncer=true"

# Conexão direta (para migrations)
DIRECT_URL="postgresql://usuario:senha@host:porta/database"

# Supabase (opcional - para storage de arquivos)
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="sua-chave-service-role"

# API Key para proteção de rotas
API_KEY="sua-chave-secreta"

# URL do frontend (para CORS)
FRONTEND_URL="http://localhost:5173"
```

### 4. Configure o banco de dados

```bash
# Gerar migrations e criar tabelas
npx prisma migrate dev --name init

# Gerar Prisma Client
npx prisma generate
```

### 5. Popular o banco de dados (opcional)

```bash
npx prisma db seed
```

### 6. Inicie o servidor

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
node src/server.js
```

O servidor estará rodando em `http://localhost:3000`

## 📡 Endpoints da API

### 🔓 Rotas Públicas (sem autenticação)

#### Livros
- `GET /api/livro` - Lista todos os livros
- `GET /api/livro/:id` - Busca livro por ID

#### Reviews
- `GET /api/reviews` - Lista todos os reviews
- `GET /api/reviews/:id` - Busca review por ID
- `GET /api/reviews/livro/:livroId` - Lista reviews de um livro específico

#### Videoaulas
- `GET /api/videoaula` - Lista todas as videoaulas
- `GET /api/videoaula/:id` - Busca videoaula por ID
- `GET /api/videoaula/livro/:livroId` - Lista videoaulas de um livro

#### Curiosidades
- `GET /api/curiosidade` - Lista todas as curiosidades
- `GET /api/curiosidade/:id` - Busca curiosidade por ID
- `GET /api/curiosidade/livro/:livroId` - Lista curiosidades de um livro

#### Dicas Vestibular
- `GET /api/dicaVestibular` - Lista todas as dicas
- `GET /api/dicaVestibular/:id` - Busca dica por ID
- `GET /api/dicaVestibular/livro/:livroId` - Lista dicas de um livro

#### Conteúdo Vestibular
- `GET /api/conteudoVestibular` - Lista todo o conteúdo
- `GET /api/conteudoVestibular/:id` - Busca conteúdo por ID
- `GET /api/conteudoVestibular/livro/:livroId` - Busca conteúdo de um livro

#### Simulados
- `GET /api/simulado` - Lista todos os simulados
- `GET /api/simulado/:id` - Busca simulado por ID (com questões e alternativas)
- `GET /api/simulado/livro/:livroId` - Lista simulados de um livro

#### Questões
- `GET /api/questao` - Lista todas as questões
- `GET /api/questao/:id` - Busca questão por ID
- `GET /api/questao/simulado/:simuladoId` - Lista questões de um simulado

#### Alternativas
- `GET /api/alternativa` - Lista todas as alternativas
- `GET /api/alternativa/:id` - Busca alternativa por ID
- `GET /api/alternativa/questao/:questaoId` - Lista alternativas de uma questão

#### Equipe
- `GET /api/equipe` - Lista todos os membros da equipe
- `GET /api/equipe/:id` - Busca membro por ID

#### Integração Externa
- `GET /api/integracao/biblioteca` - Busca livros de APIs externas
- `GET /api/integracao/teste-integracao` - Testa integração com APIs externas

### 🔒 Rotas Protegidas (requerem API Key)

**Header necessário:** `x-api-key: sua-chave-secreta`

#### Livros
- `POST /api/livro` - Criar novo livro
- `PUT /api/livro/:id` - Atualizar livro
- `DELETE /api/livro/:id` - Deletar livro

#### Reviews
- `POST /api/reviews` - Criar novo review
- `PUT /api/reviews/:id` - Atualizar review
- `DELETE /api/reviews/:id` - Deletar review

#### Videoaulas
- `POST /api/videoaula` - Criar nova videoaula
- `PUT /api/videoaula/:id` - Atualizar videoaula
- `DELETE /api/videoaula/:id` - Deletar videoaula

#### Curiosidades
- `POST /api/curiosidade` - Criar nova curiosidade
- `PUT /api/curiosidade/:id` - Atualizar curiosidade
- `DELETE /api/curiosidade/:id` - Deletar curiosidade

#### Dicas Vestibular
- `POST /api/dicaVestibular` - Criar nova dica
- `PUT /api/dicaVestibular/:id` - Atualizar dica
- `DELETE /api/dicaVestibular/:id` - Deletar dica

#### Conteúdo Vestibular
- `POST /api/conteudoVestibular` - Criar novo conteúdo
- `PUT /api/conteudoVestibular/:id` - Atualizar conteúdo
- `DELETE /api/conteudoVestibular/:id` - Deletar conteúdo

#### Simulados
- `POST /api/simulado` - Criar novo simulado
- `PUT /api/simulado/:id` - Atualizar simulado
- `DELETE /api/simulado/:id` - Deletar simulado

#### Questões
- `POST /api/questao` - Criar nova questão
- `PUT /api/questao/:id` - Atualizar questão
- `DELETE /api/questao/:id` - Deletar questão

#### Alternativas
- `POST /api/alternativa` - Criar nova alternativa
- `PUT /api/alternativa/:id` - Atualizar alternativa
- `DELETE /api/alternativa/:id` - Deletar alternativa

#### Equipe
- `POST /api/equipe` - Adicionar membro
- `PUT /api/equipe/:id` - Atualizar membro
- `DELETE /api/equipe/:id` - Remover membro

#### Upload de Arquivos
- `POST /api/fotoEquipe` - Upload de foto da equipe
- `POST /api/fotoLivro` - Upload de foto de livro
- `POST /api/fotoAutor` - Upload de foto de autor
- `POST /api/arquivoEquipe` - Upload de arquivo da equipe

## 📊 Modelo de Dados

### Principais Entidades

- **Livro**: Informações completas sobre obras literárias (bilíngue)
- **Review**: Avaliações e comentários dos usuários
- **Videoaula**: Conteúdo educacional em vídeo
- **Curiosidade**: Fatos interessantes sobre os livros
- **ConteudoVestibular**: Material específico para preparação vestibular
- **DicaVestibular**: Dicas de estudo e análise
- **Simulado**: Conjunto de questões para prática
- **Questao**: Perguntas com alternativas
- **Alternativa**: Opções de resposta para questões
- **Equipe**: Informações sobre os desenvolvedores

## 🔧 Comandos Úteis

### Prisma

```bash
# Visualizar banco de dados
npx prisma studio

# Criar nova migration
npx prisma migrate dev --name nome_da_alteracao

# Resetar banco (⚠️ APAGA TODOS OS DADOS)
npx prisma migrate reset

# Popular banco com dados iniciais
npx prisma db seed

# Gerar Prisma Client
npx prisma generate
```

### Desenvolvimento

```bash
# Iniciar servidor em modo desenvolvimento
npm run dev

# Instalar novas dependências
npm install nome-do-pacote
```

## 🌐 CORS

O servidor está configurado para aceitar requisições das seguintes origens:

- `http://localhost:5173` (desenvolvimento local)
- `http://127.0.0.1:5173` (desenvolvimento local)
- `https://backend-projeto-integrador-rana.onrender.com` (produção)
- URL definida em `FRONTEND_URL` (variável de ambiente)

## 🔐 Autenticação

Rotas protegidas requerem uma API Key enviada no header:

```
x-api-key: sua-chave-secreta
```

Configure a chave no arquivo `.env`:

```env
API_KEY=sua-chave-secreta
```

## 📦 Integração com APIs Externas

O sistema permite integração com bibliotecas externas através do endpoint `/api/integracao/biblioteca`.

### Configuração

Adicione as variáveis de ambiente para cada API externa:

```env
URL_LIVRO_CAPITAES_DA_AREIA=https://api-externa.com/livros
KEY_LIVRO_CAPITAES_DA_AREIA=chave-da-api
```

### Adicionar Nova Fonte

Edite `src/controllers/integrarApiController.js` e adicione um novo objeto em `fontesBiblioteca`:

```javascript
{
  nome: 'Nome da Biblioteca',
  url: process.env.URL_BIBLIOTECA,
  apiKey: process.env.KEY_BIBLIOTECA,
  authType: 'x-api-key', // ou 'bearer' para Authorization: Bearer
}
```

## 🚀 Deploy

### Render.com (Recomendado)

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Build Command: `npm install && npx prisma generate`
4. Start Command: `node src/server.js`

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Node.js (Heroku, Railway, Vercel, etc.)

## 🐛 Troubleshooting

### Erro de conexão com banco de dados

- Verifique se as variáveis `DATABASE_URL` e `DIRECT_URL` estão corretas
- Certifique-se de que o banco PostgreSQL está rodando
- Para Supabase, use a connection string com pooling

### Erro ao fazer upload de arquivos

- Verifique se as credenciais do Supabase estão corretas
- Confirme que o bucket de storage existe e está configurado corretamente

### Prisma Client não encontrado

```bash
npx prisma generate
```

### Banco de dados inconsistente

```bash
npx prisma migrate reset
npx prisma db seed
```

## 📝 Licença

MIT

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📞 Contato

Para dúvidas ou sugestões, entre em contato com a equipe através do repositório GitHub.

---

**Desenvolvido com ❤️ por Kaike, Thales e Jennifer**
