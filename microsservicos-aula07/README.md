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

## Aula 06 — Consumo de APIs

API de clientes que utiliza o **ViaCEP** para consultar endereços a partir do CEP.

### Endpoints

```text
GET /enderecos/:cep
POST /clientes
GET /clientes
```

### Exemplo de consulta

```text
GET /enderecos/79002000
```

### Exemplo de cliente

```json
{
  "nome": "George",
  "email": "george@email.com",
  "cep": "79002000"
}
```

Ao cadastrar um cliente, a API consulta o ViaCEP para obter o endereço.

A API possui tratamento para CEP inválido, CEP não encontrado e falha no serviço externo.

---

## Aula 07 — Microsserviços e Comunicação entre Serviços

Mini projeto utilizando dois microsserviços independentes: **Catálogo** e **Pedidos**.

O serviço de **Catálogo** mantém os dados dos produtos e o serviço de **Pedidos** consulta o Catálogo por HTTP antes de criar um pedido.

### Estrutura

```text
catalogo/
pedidos/
```

Cada serviço possui seu próprio projeto, dependências, ponto de entrada e porta.

### Catálogo

Executa na porta:

```text
3001
```

### Endpoint

```text
GET /produtos/:id
```

### Respostas

Produto encontrado:

```text
200 OK
```

Produto inexistente:

```text
404 Not Found
```

### Exemplo de produto

```json
{
  "id": 1,
  "nome": "Teclado",
  "preco": 150,
  "estoque": 10
}
```

---

### Pedidos

Executa na porta:

```text
3000
```

### Endpoint

```text
POST /pedidos
```

### Exemplo de requisição

```json
{
  "produtoId": 1,
  "quantidade": 2
}
```

O serviço de Pedidos utiliza `fetch` para consultar o Catálogo pela URL configurada na variável de ambiente.

Quando a quantidade solicitada é maior que o estoque disponível, a API retorna:

```text
409 Conflict
```

Quando o Catálogo está indisponível, a falha é tratada e pode retornar:

```text
502 Bad Gateway
```

ou

```text
504 Gateway Timeout
```

A comunicação entre os serviços possui timeout para evitar espera indefinida.

### Variáveis de ambiente

Cada microsserviço possui um arquivo `.env.example` com as configurações necessárias.

No serviço de Pedidos, a URL do Catálogo pode ser configurada pela variável:

```text
CATALOGO_URL=http://localhost:3001
```

### Testes no Thunder Client

Foram previstos testes para:

```text
Catálogo com produto existente → 200
Catálogo com produto inexistente → 404
Pedidos com quantidade válida → 201
Pedidos com estoque insuficiente → 409
Pedidos com Catálogo desligado → 502 ou 504
```

Também deve ser testada a situação em que o Catálogo fica indisponível para verificar o tratamento da falha de comunicação.

---

## Como executar

### Aula 02 até Aula 06

Em cada projeto, instale as dependências:

```bash
npm install
```

Depois execute:

```bash
npm run dev
```

A API será executada na porta `3000`.

### Aula 07 — Microsserviços

Instale as dependências separadamente em cada serviço:

```bash
cd catalogo
npm install
npm run dev
```

Em outro terminal:

```bash
cd pedidos
npm install
npm run dev
```

O Catálogo será executado na porta `3001` e Pedidos na porta `3000`.

## Observação

Os dados das APIs são armazenados em memória e são perdidos quando o servidor é reiniciado.
