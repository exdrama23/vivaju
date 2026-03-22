import { useState, type FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { apiRequest } from '@/services/api';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState<'cliente' | 'comerciante'>('cliente');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Login especial da prefeitura
    if (email === 'admin@prefeitura.aju' && senha === 'admin123') {
      login({
        id: 'pref-01',
        nome: 'Gestão Prefeitura',
        email: email,
        tipo: 'prefeitura'
      });
      navigate('/prefeitura');
      setLoading(false);
      return;
    }

    try {
      const endpoint = tipo === 'comerciante' ? '/login/loja' : '/login/cliente';
      const response = await apiRequest(endpoint, {
        method: 'POST',
        data: { email, senha }
      });

      // A API retorna algo como: { message: "...", data: { id, nome, tipo } }
      const userData = response.data || {
        id: 'u-logado',
        nome: 'Usuário',
        tipo
      };

      login({
        ...userData,
        email,
        tipo: (userData.tipo === 'comerciante' || tipo === 'comerciante') ? 'comerciante' : 'cliente'
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border">
        <h1 className="text-2xl font-bold text-center mb-2">Entrar no VIVAJU</h1>
        <p className="text-gray-500 text-center mb-6">Acesse sua conta para continuar</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Tipo de conta</label>
            <div className="flex gap-4 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setTipo('cliente')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  tipo === 'cliente' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Visitante
              </button>
              <button
                type="button"
                onClick={() => setTipo('comerciante')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  tipo === 'comerciante' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Comerciante
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">E-mail</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required disabled={loading} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <Link to="#" className="text-xs text-blue-600 hover:underline">Esqueceu a senha?</Link>
            </div>
            <Input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Sua senha" required disabled={loading} />
          </div>
          <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
        
        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-sm text-gray-600 mb-2">Ainda não faz parte do VIVAJU?</p>
          <div className="flex flex-col gap-2">
            <Link to="/cadastro" className="text-blue-600 font-semibold hover:underline">Criar conta de Visitante</Link>
            <Link to="/cadastro" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
              Sou comerciante e quero <span className="text-blue-600 font-semibold">cadastrar minha loja</span>
            </Link>
            <button 
              type="button"
              onClick={() => { setEmail('admin@prefeitura.aju'); setSenha('admin123'); }}
              className="text-xs text-gray-400 hover:text-blue-500 transition-colors mt-2"
            >
              Login da Prefeitura
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}