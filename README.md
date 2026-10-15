# Atividades de Web Services

Projetos desenvolvidos nas aulas de Web Services utilizando Node.js, TypeScript e Express.

## Tecnologias

- Node.js
- TypeScript
- Express
- Fetch API
- Thunder Client
- APIs REST
- Git e GitHub

---

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

O projeto foi separado em camadas:

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

- Logger
- Validação de livro
- Verificação de token
- Tratamento de erros

### Token

Para excluir um livro, é necessário enviar o seguinte header:

```text
Authorization: Bearer ifms123
```

Sem o token correto, a API retorna:

```text
401 Unauthorized
```

### Testes

Os projetos foram testados utilizando o Thunder Client. Também foram testados casos de erro, como dados inválidos, recursos inexistentes e acesso sem token.

---

## Aula 06 — Consumo de APIs

API de clientes que utiliza o ViaCEP para consultar endereços a partir do CEP.

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

Mini projeto utilizando dois microsserviços independentes: Catálogo e Pedidos.

O serviço de Catálogo mantém os dados dos produtos, enquanto o serviço de Pedidos consulta o Catálogo por HTTP antes de criar um pedido.

### Estrutura

```text
catalogo/
pedidos/
```

Cada serviço possui seu próprio projeto, dependências, ponto de entrada e porta.

### Catálogo

Executa na porta `3001`.

Endpoint utilizado:

```text
GET /produtos/:id
```

Respostas esperadas:

- `200 OK`: produto encontrado.
- `404 Not Found`: produto inexistente.

### Exemplo de produto

```json
{
  "id": 1,
  "nome": "Teclado",
  "preco": 150,
  "estoque": 10
}
```

### Pedidos

Executa na porta `3000`.

Endpoint:

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

Quando a quantidade solicitada é maior que o estoque disponível, a API retorna `409 Conflict`.

Quando o Catálogo está indisponível, a falha de comunicação é tratada e pode resultar em `502 Bad Gateway` ou `504 Gateway Timeout`, conforme o tratamento implementado.

### Variáveis de ambiente

Cada microsserviço possui um arquivo `.env.example` com as configurações necessárias.

No serviço de Pedidos, a URL do Catálogo pode ser configurada pela variável:

```text
CATALOGO_URL=http://localhost:3001
```

### Testes no Thunder Client

Foram previstos testes para:

```text
Produto existente → 200
Produto inexistente → 404
Pedido válido → 201
Estoque insuficiente → 409
Catálogo indisponível → 502 ou 504
```

---

## Aula 08 — Sistema de Reservas de Equipamentos e Laboratórios do IFMS

Projeto prático integrado utilizando dois Web Services independentes desenvolvidos com Node.js, TypeScript e Express.

O sistema permite consultar recursos do IFMS e solicitar reservas para aulas práticas. Antes de criar uma reserva, o serviço de Agendamentos consulta o serviço de Catálogo por HTTP para verificar se o recurso existe e está disponível.

### Estrutura

```text
servico-catalogo/
servico-agendamentos/
```

Os serviços são executados em portas diferentes e possuem responsabilidades próprias.

### Serviço de Catálogo

Executa na porta `3001` e é responsável por cadastrar, consultar e alterar o status dos recursos.

#### Endpoints

| Método | Endpoint | Função |
|---|---|---|
| GET | `/recursos` | Lista todos os recursos |
| GET | `/recursos/:id` | Busca um recurso pelo ID |
| POST | `/recursos` | Cadastra um recurso |
| PATCH | `/recursos/:id/status` | Altera o status do recurso |

O endpoint de listagem também permite filtrar recursos por tipo e status.

Exemplos:

```text
GET /recursos?status=disponivel
GET /recursos?tipo=laboratorio
GET /recursos?tipo=equipamento&status=manutencao
```

#### Exemplo de recurso

```json
{
  "id": 1,
  "nome": "Laboratório 3",
  "tipo": "laboratorio",
  "local": "Bloco B",
  "status": "disponivel"
}
```

Tipos aceitos:

```text
laboratorio
equipamento
```

Status aceitos:

```text
disponivel
manutencao
indisponivel
```

O cadastro valida os campos obrigatórios e os valores permitidos. A busca por um recurso inexistente retorna `404 Not Found`.

### Serviço de Agendamentos

Executa na porta `3000` e é responsável por receber, consultar, filtrar, atualizar e excluir reservas.

#### Endpoints

| Método | Endpoint | Função |
|---|---|---|
| GET | `/agendamentos` | Lista os agendamentos |
| GET | `/agendamentos/:id` | Busca um agendamento pelo ID |
| POST | `/agendamentos` | Cria um agendamento |
| PATCH | `/agendamentos/:id/status` | Altera o status do agendamento |
| DELETE | `/agendamentos/:id` | Exclui um agendamento |

Também é possível filtrar os agendamentos por curso e status.

Exemplos:

```text
GET /agendamentos?curso=TSI
GET /agendamentos?status=confirmado
GET /agendamentos?curso=TSI&status=pendente
```

#### Exemplo de requisição

`POST /agendamentos`

```json
{
  "solicitante": "Ana Souza",
  "curso": "TSI",
  "recursoId": 2,
  "data": "2026-10-09",
  "horario": "18:50-20:20",
  "finalidade": "Aula prática de redes"
}
```

#### Exemplo de resposta

Quando a reserva é criada com sucesso, a API retorna `201 Created` e apresenta os dados da reserva junto com informações resumidas do recurso consultado.

```json
{
  "id": 1,
  "solicitante": "Ana Souza",
  "curso": "TSI",
  "recurso": {
    "id": 2,
    "nome": "Projetor Epson",
    "local": "Sala 12"
  },
  "data": "2026-10-09",
  "horario": "18:50-20:20",
  "status": "confirmado"
}
```

Os dados do recurso são obtidos por meio da consulta ao Catálogo, e não de uma lista duplicada no serviço de Agendamentos.

### Integração entre os serviços

O fluxo de criação de uma reserva funciona da seguinte maneira:

1. O cliente envia os dados para o serviço de Agendamentos.
2. Os campos obrigatórios são validados.
3. O serviço utiliza `fetch` e `async/await` para consultar o Catálogo pelo `recursoId`.
4. O Catálogo informa se o recurso existe e qual é seu status.
5. Se o recurso estiver disponível, o agendamento é criado.
6. O serviço retorna a resposta em JSON.

O cliente precisa chamar apenas o endpoint de Agendamentos para concluir a solicitação.

### Status HTTP

| Status | Situação |
|---|---|
| `200 OK` | Consulta ou alteração realizada com sucesso |
| `201 Created` | Recurso ou agendamento criado |
| `204 No Content` | Agendamento excluído |
| `400 Bad Request` | Dados ausentes ou inválidos |
| `401 Unauthorized` | Token ausente ou inválido |
| `404 Not Found` | Recurso ou agendamento não encontrado |
| `409 Conflict` | Recurso indisponível para reserva |
| `502 Bad Gateway` | Falha na comunicação com o Catálogo |

### Middlewares e tratamento de erros

O projeto utiliza os seguintes middlewares:

- `logger`: registra o horário, o método HTTP e a URL da requisição.
- `validarRecurso`: valida os dados enviados para cadastrar um recurso.
- `validarAgendamento`: valida os dados enviados para criar uma reserva.
- `verificarToken`: protege operações que exigem autorização.
- `errorHandler`: centraliza o tratamento de erros e retorna respostas em JSON.

As respostas de erro seguem um formato padronizado, com informações como mensagem, status HTTP e origem do erro.

### Autorização

As seguintes operações exigem o token didático:

```text
PATCH /recursos/:id/status
PATCH /agendamentos/:id/status
DELETE /agendamentos/:id
```

No Thunder Client, o header deve ser configurado assim:

```text
Authorization: Bearer ifms2026
```

Sem o token correto, a API retorna `401 Unauthorized`.

### Testes realizados

Os testes foram realizados utilizando o Thunder Client.

**Catálogo**

- Listagem e busca de recursos.
- Busca de recurso inexistente.
- Cadastro válido e inválido.
- Filtros por tipo e status.
- Alteração de status com e sem token.

**Agendamentos**

- Criação de reserva válida.
- Validação de campos obrigatórios.
- Tentativa de reserva para recurso inexistente.
- Tentativa de reserva para recurso em manutenção.
- Listagem e filtros por curso e status.
- Alteração e exclusão de agendamentos com e sem token.

**Integração**

- Criação de reserva consultando o Catálogo.
- Retorno de erro quando o recurso não existe.
- Retorno de conflito quando o recurso está indisponível.
- Tratamento de falha quando o Catálogo está desligado.

As evidências dos testes devem ser disponibilizadas na pasta `evidencias/` ou em um arquivo `TESTES.md`.

---

## Como executar os projetos

### Aulas 02 a 06

Entre na pasta da atividade desejada, instale as dependências e execute:

```bash
npm install
npm run dev
```

Consulte os arquivos de cada projeto para verificar a porta utilizada.

### Aula 07 — Microsserviços

Em um terminal, execute o Catálogo:

```bash
cd catalogo
npm install
npm run dev
```

Em outro terminal, execute Pedidos:

```bash
cd pedidos
npm install
npm run dev
```

O Catálogo utiliza a porta `3001` e Pedidos utiliza a porta `3000`.

### Aula 08 — Sistema de Reservas

Em um terminal, execute o serviço de Catálogo:

```bash
cd servico-catalogo
npm install
npm run dev
```

Em outro terminal, execute o serviço de Agendamentos:

```bash
cd servico-agendamentos
npm install
npm run dev
```

O Catálogo será executado em `http://localhost:3001` e Agendamentos em `http://localhost:3000`.

Os dois serviços precisam estar rodando simultaneamente para que a integração funcione.

---

## Observação

Os projetos utilizam armazenamento em memória, quando aplicável. Nesses casos, os dados são perdidos quando o servidor é reiniciado.

Não envie a pasta `node_modules/` nem arquivos `.env` para o GitHub. Cada projeto deve conter as instruções e configurações necessárias para sua execução.
