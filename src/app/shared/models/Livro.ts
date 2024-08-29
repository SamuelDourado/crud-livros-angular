import internal from "stream";

export interface ApiResponse<T> {
  message?: string;
  data: T;
}

export interface ILivro {
  id?: string;
  codL: string;
  titulo: string;
  editora: string;
  edicao: string;
  anoPublicacao: Number,
  valor: Number
}