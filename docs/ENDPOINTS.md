# Documentação dos endpoints

## POST /auth/register

**Público**

Body:

```json
{
  "name": "João",
  "email": "joao@example.com",
  "password": "Senha@123",
  "role": "USER"
}
```

## POST /auth/login

**Público**

Body:

```json
{
  "email": "joao@example.com",
  "password": "Senha@123"
}
```

Retorna JWT com identificador e perfil.

## GET /users/me

**Protegido por JWT**

Header:

```text
Authorization: Bearer <token>
```

## GET /admin/ping

**Protegido por JWT + RBAC ADMIN**

Header:

```text
Authorization: Bearer <token>
```

Usuário `USER` recebe `403`.
