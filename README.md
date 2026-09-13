# MedClinic API

Mini-projeto da etapa de **Autenticação e Autorização**.

## Escopo

Esta etapa implementa exclusivamente a base da API para:

- cadastro de usuários;
- senha protegida com bcrypt;
- login com JWT;
- middleware de autenticação;
- autorização por perfil (RBAC);
- `GET /users/me`;
- `GET /admin/ping` protegido para `ADMIN`;
- tratamento centralizado de erros;
- PostgreSQL via TypeORM;
- arquitetura em camadas: Routes, Middlewares, Controllers, Services, Repositories, Entities, Database e Utils.

As funcionalidades de especialidades, médicos, pacientes e consultas ficam para uma etapa futura.

## Tecnologias

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- bcrypt
- JSON Web Token

## Pré-requisitos

- Node.js 20+
- PostgreSQL 14+
- npm

## Instalação

```bash
npm install
```

Copie `.env.example` para `.env` e ajuste as credenciais:

```bash
copy .env.example .env
```

No Linux/macOS:

```bash
cp .env.example .env
```

Crie o banco:

```sql
CREATE DATABASE medclinic;
```

Execute o script SQL:

```bash
psql -U postgres -d medclinic -f src/database/schema.sql
```

> O projeto usa `synchronize: false`; a estrutura deve ser criada por SQL/migrations.

## Execução

Desenvolvimento:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Produção:

```bash
npm start
```

A API ficará em `http://localhost:3000`.

## Endpoints

### POST /auth/register

Cadastro de usuário.

Exemplo:

```json
{
  "name": "Maria Silva",
  "email": "maria@example.com",
  "password": "Senha@123",
  "role": "USER"
}
```

Resposta `201`:

```json
{
  "id": 1,
  "name": "Maria Silva",
  "email": "maria@example.com",
  "role": "USER",
  "createdAt": "..."
}
```

A senha nunca é retornada.

### POST /auth/login

```json
{
  "email": "maria@example.com",
  "password": "Senha@123"
}
```

Resposta `200`:

```json
{
  "token": "eyJ..."
}
```

### GET /users/me

Header:

```text
Authorization: Bearer SEU_TOKEN
```

Retorna os dados do usuário autenticado.

### GET /admin/ping

Header:

```text
Authorization: Bearer TOKEN_DE_ADMIN
```

Somente `ADMIN` pode acessar.

## Perfis

- `USER`: pode consultar seu próprio perfil.
- `ADMIN`: pode consultar seu próprio perfil e acessar `/admin/ping`.

## Códigos HTTP previstos

- `201`: cadastro realizado.
- `200`: operação realizada.
- `400`: dados inválidos.
- `401`: credenciais/token inválidos ou ausentes.
- `403`: usuário autenticado sem permissão.
- `409`: e-mail já cadastrado.
- `500`: erro interno.

## Arquitetura

```text
Cliente HTTP
    ↓
Routes
    ↓
Middlewares (JWT / RBAC / erros)
    ↓
Controllers
    ↓
Services
    ↓
Repositories (TypeORM)
    ↓
PostgreSQL
```

## Estrutura

```text
src/
├── controllers/
│   ├── AuthController.ts
│   ├── AdminController.ts
│   └── UserController.ts
├── database/
│   ├── data-source.ts
│   └── schema.sql
├── entities/
│   └── User.ts
├── middlewares/
│   ├── authMiddleware.ts
│   ├── errorMiddleware.ts
│   └── rbacMiddleware.ts
├── repositories/
│   └── UserRepository.ts
├── routes/
│   ├── authRoutes.ts
│   ├── adminRoutes.ts
│   └── userRoutes.ts
├── services/
│   ├── AuthService.ts
│   └── UserService.ts
├── types/
│   └── AuthRequest.ts
├── utils/
│   ├── password.ts
│   └── jwt.ts
└── server.ts
```

## Segurança

- senha armazenada somente como hash bcrypt;
- JWT com expiração definida por `.env`;
- segredo JWT fora do código-fonte;
- rotas protegidas pelo header `Authorization`;
- RBAC aplicado no endpoint administrativo;
- mensagens de login inválido não informam se o e-mail ou a senha está incorreto.

## Teste rápido com curl

Cadastro:

```bash
curl -X POST http://localhost:3000/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Admin\",\"email\":\"admin@medclinic.com\",\"password\":\"Senha@123\",\"role\":\"ADMIN\"}"
```

Login:

```bash
curl -X POST http://localhost:3000/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@medclinic.com\",\"password\":\"Senha@123\"}"
```

Depois use o token retornado:

```bash
curl http://localhost:3000/users/me -H "Authorization: Bearer SEU_TOKEN"
curl http://localhost:3000/admin/ping -H "Authorization: Bearer SEU_TOKEN"
```

## Git

Branches mínimas previstas:

```text
main
develop
feat/setup-projeto
feat/auth
feat/rbac
docs/readme
```

Exemplos de commits semânticos:

```text
feat: cria estrutura inicial do projeto
feat: configura conexão com PostgreSQL via TypeORM
feat: cria entidade de usuário
feat: implementa cadastro de usuários
feat: implementa criptografia de senha com bcrypt
feat: implementa login com emissão de JWT
feat: implementa middleware de autenticação
feat: implementa middleware de autorização RBAC
feat: cria endpoints de verificação users/me e admin/ping
refactor: organiza camadas da aplicação
fix: corrige tratamento de token expirado
docs: atualiza README
```

O histórico deve demonstrar evolução incremental do projeto.
