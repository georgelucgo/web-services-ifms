# Atividades de Web Services

Projetos desenvolvidos nas aulas de Web Services utilizando Node.js, TypeScript e Express.

## Tecnologias

* Node.js
* TypeScript
* Express
* Thunder Client

## Aula 02 — API de Produtos

API simples para cadastrar, consultar, alterar e excluir produtos.

### Endpoints

```text
GET /produtos
GET /produtos/:id
POST /produtos
PUT /produtos/:id
DELETE /produtos/:id
```

### Exemplo de produto

```json
{
  "id": 1,
  "nome": "Teclado",
  "preco": 150
}
```

A API possui validações para ID, nome, preço e produto inexistente.

---

## Aula 03 — API de Chamados

API para gerenciamento de chamados.

### Endpoints

```text
GET /chamados
GET /chamados/:id
POST /chamados
PUT /chamados/:id
PATCH /chamados/:id/status
DELETE /chamados/:id
```

### Exemplo de chamado

```json
{
  "titulo": "Internet caiu",
  "descricao": "Sala 4 sem conexão.",
  "prioridade": "alta"
}
```

Prioridades:

```text
baixa
media
alta
```

Status:

```text
aberto
em_andamento
fechado
```

A API possui validações e filtros por status e prioridade.

---

## Aula 04 — API de Biblioteca

API de biblioteca organizada em camadas.

### Endpoints

```text
GET /autores
POST /autores

GET /livros
GET /livros/:id
POST /livros
PATCH /livros/:id/disponibilidade
DELETE /livros/:id
```

### Exemplo de autor

```json
{
  "nome": "Machado de Assis",
  "nacionalidade": "Brasileiro"
}
```

### Exemplo de livro

```json
{
  "titulo": "Dom Casmurro",
  "autorId": 1,
  "ano": 1899
}
```

O projeto foi separado em:

```text
routes
controllers
services
repositories
types
```

Também existe uma validação para verificar se o autor informado no livro existe.

---

## Aula 05 — Middlewares

A API de biblioteca foi aprimorada com middlewares.

### Middlewares utilizados

```text
Logger
Validação de livro
Verificação de token
Tratamento de erros
```

### Token

Para excluir um livro:

```text
Authorization: Bearer ifms123
```

Sem o token correto, a API retorna:

```text
401 Unauthorized
```

### Testes

Os projetos foram testados utilizando o Thunder Client.

Foram testados também casos de erro, como dados inválidos, recursos inexistentes e acesso sem token.

---

## Como executar

Em cada projeto, instale as dependências:

```bash
npm install
```

Depois execute:

```bash
npm run dev
```

A API será executada na porta `3000`.

## Observação

Os dados das APIs são armazenados em memória e são perdidos quando o servidor é reiniciado.
