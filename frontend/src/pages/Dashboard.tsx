import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export function Dashboard() {
  const { user, logout, adicionarProduto, adicionarCategoria } = useAuth();
  useData();

  // Estados para Categorias
  const [nomeCategoria, setNomeCategoria] = useState('');

  // Estados para Produtos
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [marcaProduto, setMarcaProduto] = useState('');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isComerciante = user.tipo === 'comerciante';

  const handleAdicionarCategoria = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeCategoria.trim()) return;
    adicionarCategoria({ nome: nomeCategoria });
    setNomeCategoria('');
  };

  const handleAdicionarProduto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeProduto.trim() || !precoProduto.trim()) return;
    adicionarProduto({
      nome: nomeProduto,
      preco: precoProduto,
      marca: marcaProduto || undefined
    });
    setNomeProduto('');
    setPrecoProduto('');
    setMarcaProduto('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl md:pb-0 pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Meu Painel</h1>
        <Button variant="outline" onClick={logout} className="w-full sm:w-auto">Sair</Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Dados do Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Nome {isComerciante ? 'da Loja' : 'Completo'}</p>
              <p className="font-medium text-base sm:text-lg">{user.nome}</p>
            </div>
            <div>
              <p className="text-gray-500">E-mail</p>
              <p className="font-medium text-base sm:text-lg">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Tipo de Conta</p>
              <p className="font-medium text-base sm:text-lg capitalize">{user.tipo}</p>
            </div>
            {user.telefoneContato && (
              <div>
                <p className="text-gray-500">Telefone de Contato</p>
                <p className="font-medium text-base sm:text-lg">{user.telefoneContato}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isComerciante && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <CardTitle>Detalhes do Comércio</CardTitle>
                {user.vendedorAmbulante && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Vendedor Ambulante
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-sm">Descrição</p>
                  <p className="text-gray-700 text-sm sm:text-base whitespace-pre-wrap">{user.descricao || 'Sem descrição.'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Serviços</h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-gray-700 text-sm">
                        <span className={user.estacionamento ? "text-green-500" : "text-gray-300"}>
                          {user.estacionamento ? "●" : "○"}
                        </span>
                        É estacionamento? {user.estacionamento ? 'Sim' : 'Não'}
                      </p>
                      {user.estacionamento && user.estacionamentoInfo && (
                        <p className="text-xs sm:text-sm text-gray-500 ml-5">
                          Valor: R$ {user.estacionamentoInfo.preco} ({user.estacionamentoInfo.tempoPreco})
                        </p>
                      )}
                    </div>
                  </div>

                  {!user.vendedorAmbulante && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Localização</h3>
                      <div className="text-gray-700 text-sm space-y-1">
                        <p>{user.logradouro}, {user.numEndereco}</p>
                        {user.complemento && <p>{user.complemento}</p>}
                        <p>CEP: {user.cep}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Seção de Categorias */}
            <Card>
              <CardHeader>
                <CardTitle>Categorias</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdicionarCategoria} className="space-y-4 mb-6">
                  <Input 
                    placeholder="Nome da categoria (ex: Bebidas)" 
                    value={nomeCategoria}
                    onChange={e => setNomeCategoria(e.target.value)}
                    className="text-sm"
                  />
                  <Button type="submit" className="w-full text-sm h-10">Adicionar Categoria</Button>
                </form>

                <div className="space-y-2">
                  <h4 className="text-[11px] font-semibold text-gray-500 uppercase">Minhas Categorias</h4>
                  {user.categorias && user.categorias.length > 0 ? (
                    <ul className="divide-y border rounded-lg">
                      {user.categorias.map(cat => (
                        <li key={cat.id} className="p-3 text-sm flex justify-between items-center">
                          {cat.nome}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Nenhuma categoria cadastrada.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Seção de Produtos */}
            <Card>
              <CardHeader>
                <CardTitle>Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdicionarProduto} className="space-y-4 mb-6">
                  <Input 
                    placeholder="Nome do produto" 
                    value={nomeProduto}
                    onChange={e => setNomeProduto(e.target.value)}
                    required
                    className="text-sm"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input 
                      placeholder="Preço (ex: 15.00)" 
                      value={precoProduto}
                      onChange={e => setPrecoProduto(e.target.value)}
                      required
                      className="text-sm"
                    />
                    <Input 
                      placeholder="Marca (opcional)" 
                      value={marcaProduto}
                      onChange={e => setMarcaProduto(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <Button type="submit" className="w-full text-sm h-10">Adicionar Produto</Button>
                </form>

                <div className="space-y-2">
                  <h4 className="text-[11px] font-semibold text-gray-500 uppercase">Meus Produtos</h4>
                  {user.produtos && user.produtos.length > 0 ? (
                    <ul className="divide-y border rounded-lg">
                      {user.produtos.map(prod => (
                        <li key={prod.id} className="p-3 text-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4">
                          <div className="flex-1">
                            <span className="font-medium">{prod.nome}</span>
                            {prod.marca && <span className="text-gray-400 ml-2 text-xs">({prod.marca})</span>}
                          </div>
                          <span className="text-blue-600 font-semibold whitespace-nowrap">R$ {prod.preco}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Nenhum produto cadastrado.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {user.tipo === 'cliente' && (
        <Card>
          <CardHeader>
            <CardTitle>Minhas Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Você ainda não possui avaliações ou eventos salvos.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}