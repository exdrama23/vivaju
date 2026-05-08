export interface EstacionamentoInfo {
  preco: string;
  tempoPreco: string;
}

export interface Categoria {
  id: string;
  nome: string;
}

export interface ProdutoLoja {
  id: string;
  nome: string;
  preco: string;
  marca?: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  telefone?: string; // Para clientes
  tipo: 'cliente' | 'comerciante' | 'prefeitura';
  
  // Campos de comerciante (Loja no backend)
  descricao?: string;
  telefoneContato?: string;
  vendedorAmbulante?: boolean;
  cep?: string;
  logradouro?: string;
  numEndereco?: string;
  complemento?: string;
  estacionamento?: boolean;
  estacionamentoInfo?: EstacionamentoInfo;
  categorias?: Categoria[];
  produtos?: ProdutoLoja[];
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
  telefoneContato: string;
  categoria: string;
  descricao: string;
  vendedorAmbulante: boolean;
  cep?: string;
  logradouro?: string;
  numEndereco?: string;
  complemento?: string;
  estacionamento: boolean;
  estacionamentoInfo?: EstacionamentoInfo;
  imagem: string;
  latitude: number;
  longitude: number;
  produtos: Produto[];
  avaliacoes: Avaliacao[];
  statusAberto: boolean;
  tags: string[];
  favoritada: boolean;
}

export interface Evento {
  id: string;
  nome: string;
  descricao: string;
  inicio: string;
  fim: string;
  localizacao: string;
  categoria: string;
  imagem?: string;
  latitude?: number;
  longitude?: number;
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
  tempoPreco: string;
}