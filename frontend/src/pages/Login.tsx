import { useState, type FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Mock login
    login({
      id: 'u-logado',
      nome: 'Usuário Teste',
      email,
      tipo: 'cliente'
    });
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border">
        <h1 className="text-2xl font-bold text-center mb-6">Entrar no VIVAJU</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <Input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full">Entrar</Button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta? <Link to="/cadastro" className="text-blue-600 font-medium hover:underline">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}