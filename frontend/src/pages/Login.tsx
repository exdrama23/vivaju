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
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-gray-50 min-h-[calc(100vh-64px)] pb-32 md:pb-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-sm border">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">Entrar no VIVAJU</h1>
        <p className="text-gray-500 text-sm sm:text-base text-center mb-6">Acesse sua conta para continuar</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Tipo de conta</label>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setTipo('cliente')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  tipo === 'cliente' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Visitante
              </button>
              <button
                type="button"
                onClick={() => setTipo('comerciante')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  tipo === 'comerciante' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Comerciante
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">E-mail</label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required disabled={loading} className="h-11" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                <Link to="#" className="text-xs text-blue-600 font-medium hover:underline">Esqueceu a senha?</Link>
              </div>
              <Input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Sua senha" required disabled={loading} className="h-11" />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-bold mt-2" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
        
        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-sm text-gray-500 mb-4">Ainda não faz parte do VIVAJU?</p>
          <div className="flex flex-col gap-3">
            <Link to="/cadastro" className="text-blue-600 font-bold hover:underline py-1">
              Criar conta de Visitante
            </Link>
            <Link to="/cadastro" className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors py-1">
              Sou comerciante e quero <span className="text-blue-600 font-bold">cadastrar minha loja</span>
            </Link>
            <button 
              type="button"
              onClick={() => { setEmail('admin@prefeitura.aju'); setSenha('admin123'); }}
              className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-colors mt-4 font-bold"
            >
              Acesso Restrito Prefeitura
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}