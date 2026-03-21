import { Comercio, Evento, Estacionamento } from '@/types';

export const mockComercios: Comercio[] = [
  {
    id: 'c1',
    usuarioId: 'u1',
    nome: 'Café do Centro',
    email: 'contato@cafedocentro.com',
    telefone: '11999999999',
    categoria: 'Alimentação',
    horarioFuncionamento: '08:00 - 18:00',
    imagem: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80',
    latitude: -23.55052,
    longitude: -46.633309,
    statusAberto: true,
    tags: ['café', 'artesanal', 'wi-fi'],
    produtos: [
      { id: 'p1', comercioId: 'c1', nome: 'Café Expresso', descricao: 'Café forte e encorpado', preco: 5.0 },
      { id: 'p2', comercioId: 'c1', nome: 'Pão de Queijo', descricao: 'Porção com 5 unidades', preco: 8.0 }
    ],
    avaliacoes: [
      { id: 'a1', comercioId: 'c1', usuarioId: 'u2', nota: 5, comentario: 'Ótimo lugar!', data: '2023-10-01' }
    ]
  },
  {
    id: 'c2',
    usuarioId: 'u3',
    nome: 'Livraria Central',
    email: 'contato@livrariacentral.com',
    telefone: '11888888888',
    categoria: 'Varejo',
    horarioFuncionamento: '09:00 - 19:00',
    imagem: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=400&q=80',
    latitude: -23.55152,
    longitude: -46.634309,
    statusAberto: true,
    tags: ['livros', 'cultura', 'promoção'],
    produtos: [
      { id: 'p3', comercioId: 'c2', nome: 'O Senhor dos Anéis', descricao: 'Edição de colecionador', preco: 120.0 }
    ],
    avaliacoes: []
  }
];

export const mockEventos: Evento[] = [
  {
    id: 'e1',
    nome: 'Feira de Artesanato',
    descricao: 'Feira local com produtos artesanais e comidas típicas.',
    dataHora: '2026-03-25T10:00:00Z',
    categoria: 'Cultura',
    latitude: -23.55252,
    longitude: -46.632309,
    imagem: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=400&q=80'
  }
];

export const mockEstacionamentos: Estacionamento[] = [
  {
    id: 'est1',
    nome: 'Estacionamento Central',
    latitude: -23.55000,
    longitude: -46.633000,
    numeroVagas: 100,
    vagasOcupadas: 45,
    status: 'livre',
    precoHora: 15.0
  },
  {
    id: 'est2',
    nome: 'Auto Park',
    latitude: -23.55200,
    longitude: -46.635000,
    numeroVagas: 50,
    vagasOcupadas: 48,
    status: 'lotado',
    precoHora: 20.0
  }
];