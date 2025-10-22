export interface Kid {
  id?: number;
  nomeCompleto: string;
  nomePai?: string;
  nomeMae?: string;
  bandeira?: string;
  localNascimento?: string;
  dataNascimento?: string;
  tipo?: 'CRIANCA';
  expanded?: boolean;
}
