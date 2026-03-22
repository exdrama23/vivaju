import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function Dashboard() {
  const { user, logout } = useAuth();
  const { comercios } = useData();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userComercio = user.tipo === 'comerciante' ? comercios.find(c => c.usuarioId === user.id) : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meu Painel</h1>
        <Button variant="outline" onClick={logout}>Sair</Button>
      </div>

      <div className="bg-white p-6 rounded-2xl border shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Dados do Perfil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Nome</p>
            <p className="font-medium text-lg">{user.nome}</p>
          </div>
          <div>
            <p className="text-gray-500">E-mail</p>
            <p className="font-medium text-lg">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Tipo de Conta</p>
            <p className="font-medium text-lg capitalize">{user.tipo}</p>
          </div>
        </div>
      </div>

      {user.tipo === 'comerciante' && (
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Meu Comércio</h2>
          {userComercio ? (
            <div>
              <h3 className="font-bold text-lg">{userComercio.nome}</h3>
              <p className="text-sm text-gray-500 mb-4">{userComercio.categoria}</p>
              
              <div className="flex gap-2">
                <Button>Editar Informações</Button>
                <Button variant="outline">Gerenciar Produtos</Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 mb-4">Você ainda não cadastrou seu comércio.</p>
              <Button>Cadastrar Comércio</Button>
            </div>
          )}
        </div>
      )}

      {user.tipo === 'cliente' && (
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Minhas Atividades</h2>
          <p className="text-gray-500">Você ainda não possui avaliações ou eventos salvos.</p>
        </div>
      )}
    </div>
  );
}