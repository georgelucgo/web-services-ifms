# Testes da Aula 08 — Sistema de Reservas do IFMS

Os testes foram realizados utilizando o Thunder Client para verificar os endpoints, as validações, os status HTTP e a comunicação entre os serviços de Catálogo e Agendamentos.

## 1. Testes do Serviço de Catálogo

**Endereço:** `http://localhost:3001`

| Teste | Requisição | Resultado esperado |
|---|---|---|
| Listar recursos | `GET /recursos` | `200 OK` com uma lista |
| Buscar recurso existente | `GET /recursos/1` | `200 OK` com o recurso |
| Buscar recurso inexistente | `GET /recursos/999` | `404 Not Found` |
| Cadastrar recurso válido | `POST /recursos` | `201 Created` |
| Cadastrar recurso inválido | `POST /recursos` com nome vazio | `400 Bad Request` |
| Filtrar recursos disponíveis | `GET /recursos?status=disponivel` | `200 OK` com a lista filtrada |
| Filtrar por tipo | `GET /recursos?tipo=laboratorio` | `200 OK` com a lista filtrada |
| Alterar status sem token | `PATCH /recursos/1/status` | `401 Unauthorized` |
| Alterar status com token | `PATCH /recursos/1/status` | `200 OK` |
| Alterar para status inválido | `PATCH /recursos/1/status` | `400 Bad Request` |

### Exemplo de cadastro

Método: `POST`

URL: `http://localhost:3001/recursos`

Body JSON:

```json
{
  "nome": "Notebook",
  "tipo": "equipamento",
  "local": "Laboratório 2",
  "status": "disponivel"
}
```

Resultado esperado: `201 Created`.

### Exemplo de alteração de status

Método: `PATCH`

URL: `http://localhost:3001/recursos/1/status`

Header:

```text
Authorization: Bearer ifms2026
```

Body JSON:

```json
{
  "status": "manutencao"
}
```

Resultado esperado: `200 OK`.

## 2. Testes do Serviço de Agendamentos

**Endereço:** `http://localhost:3000`

| Teste | Requisição | Resultado esperado |
|---|---|---|
| Listar agendamentos | `GET /agendamentos` | `200 OK` com uma lista |
| Buscar agendamento existente | `GET /agendamentos/1` | `200 OK` com o agendamento |
| Criar agendamento válido | `POST /agendamentos` com recurso disponível | `201 Created` |
| Criar sem solicitante | `POST /agendamentos` sem o campo `solicitante` | `400 Bad Request` |
| Criar com recurso inexistente | `POST /agendamentos` com `recursoId` igual a `999` | `404 Not Found` |
| Reservar recurso em manutenção | `POST /agendamentos` com `recursoId` igual a `3` | `409 Conflict` |
| Filtrar por curso | `GET /agendamentos?curso=TSI` | `200 OK` com a lista filtrada |
| Filtrar por status | `GET /agendamentos?status=confirmado` | `200 OK` com a lista filtrada |
| Alterar status sem token | `PATCH /agendamentos/1/status` | `401 Unauthorized` |
| Alterar status com token | `PATCH /agendamentos/1/status` | `200 OK` |
| Alterar para status inválido | `PATCH /agendamentos/1/status` | `400 Bad Request` |
| Excluir sem token | `DELETE /agendamentos/1` | `401 Unauthorized` |
| Excluir com token | `DELETE /agendamentos/1` | `204 No Content` |
| Excluir agendamento inexistente | `DELETE /agendamentos/999` | `404 Not Found` |

### Exemplo de criação de agendamento

Método: `POST`

URL: `http://localhost:3000/agendamentos`

Body JSON:

```json
{
  "solicitante": "Ana Souza",
  "curso": "TSI",
  "recursoId": 2,
  "data": "2026-10-20",
  "horario": "18:50-20:20",
  "finalidade": "Aula prática de redes"
}
```

Resultado esperado: `201 Created`, com os dados do agendamento e as informações resumidas do recurso.

## 3. Testes de autorização

As rotas protegidas exigem o header `Authorization`.

### Requisição sem token

Método: `DELETE`

URL: `http://localhost:3000/agendamentos/1`

Resultado esperado: `401 Unauthorized`.

### Requisição com token

Header:

```text
Authorization: Bearer ifms2026
```

Resultado esperado: a operação é autorizada, desde que os demais dados sejam válidos.

## 4. Testes de integração entre os serviços

Esses testes verificam se o serviço de Agendamentos consulta o Catálogo por HTTP antes de criar uma reserva.

| Teste | Procedimento | Resultado esperado |
|---|---|---|
| Recurso disponível | Enviar um agendamento com ID de recurso disponível | `201 Created` |
| Recurso inexistente | Enviar um agendamento com ID inexistente no Catálogo | `404 Not Found` |
| Recurso em manutenção | Enviar um agendamento para recurso em manutenção | `409 Conflict` |
| Catálogo indisponível | Parar o serviço de Catálogo e tentar criar um agendamento | `502 Bad Gateway` |

### Procedimento para testar a falha de integração

1. Iniciar os dois serviços.
2. Confirmar que o Catálogo responde normalmente.
3. Parar o serviço de Catálogo.
4. Enviar uma requisição para `POST /agendamentos`.
5. Verificar se o serviço de Agendamentos retorna `502 Bad Gateway`.
6. Iniciar novamente o Catálogo para continuar os testes.

## 5. Tratamento de erros

Os testes também verificam se as falhas retornam os status HTTP adequados e respostas em JSON, seguindo o tratamento de erros implementado nos serviços.

| Status HTTP | Significado |
|---|---|
| `400 Bad Request` | Dados enviados inválidos ou incompletos |
| `401 Unauthorized` | Token ausente ou inválido |
| `404 Not Found` | Recurso ou agendamento não encontrado |
| `409 Conflict` | Recurso indisponível para reserva |
| `502 Bad Gateway` | Falha na comunicação com o Catálogo |

## Observações

- Os serviços precisam estar em execução simultaneamente para os testes de integração.
- Os testes devem ser realizados com as URLs e portas indicadas neste documento.
- Como os dados são armazenados em memória, os registros podem ser perdidos quando os servidores são reiniciados.
- Os IDs utilizados nos testes dependem dos registros existentes no momento da execução.
