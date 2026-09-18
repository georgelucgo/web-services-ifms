import { AppError } from "../errors/AppError.js";

import type { ViaCepResponse } from "../types/viacep.js";

export async function consultarCep(cep: string) {

  const apenasNumeros = cep.replace("-", "");

  if (!/^\d{8}$/.test(apenasNumeros)) {
    throw new AppError(
      "CEP inválido",
      400
    );
  }

  const url =
    "https://viacep.com.br/ws/" +
    apenasNumeros +
    "/json/";

  try {

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new AppError(
        "Serviço externo indisponível",
        502
      );
    }

    const dados =
      await resposta.json() as ViaCepResponse;

    if (dados.erro) {
      throw new AppError(
        "CEP não encontrado",
        404
      );
    }

    return {
      cep: dados.cep,
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    };

  } catch (error) {

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Serviço externo indisponível",
      502
    );
  }
}