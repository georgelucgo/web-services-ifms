export class AppError extends Error {
  statusCode: number;

  constructor(mensagem: string, statusCode: number) {
    super(mensagem);
    this.statusCode = statusCode;
  }
}