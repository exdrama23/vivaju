export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  telefone?: string;
  tipo: 'cliente' | 'comerciante';
}

export interface Produto {
  id: string;
  comercioId: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
  tags?: string[];
}

export interface Avaliacao {
  id: string;
  usuarioId: string;
  comercioId: string;
  nota: number; // 1 to 5
  comentario: string;
  data: string;
}

export interface Comercio {
  id: string;
  usuarioId: string; // The merchant owner
  nome: string;
  email: string;
  telefone: string;
  categoria: string;
  horarioFuncionamento: string;
  imagem: string;
  latitude: number;
  longitude: number;
  produtos: Produto[];
  avaliacoes: Avaliacao[];
  statusAberto: boolean;
  tags: string[];
}

export interface Evento {
  id: string;
  nome: string;
  descricao: string;
  dataHora: string;
  categoria: string;
  latitude: number;
  longitude: number;
  imagem?: string;
}

export interface Estacionamento {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  numeroVagas: number;
  vagasOcupadas: number;
  status: 'livre' | 'médio' | 'lotado';
  precoHora: number;
}