import { useState, type FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState<'cliente'|'comerciante'>('cliente');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleCadastro = (e: FormEvent) => {
    e.preventDefault();
    register({
      id: Date.now().toString(),
      nome,
      email,
      senha,
      tipo
    });
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border">
        <h1 className="text-2xl font-bold text-center mb-6">Criar Conta</h1>
        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome completo</label>
            <Input value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <Input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de conta</label>
            <select 
              className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm"
              value={tipo}
              onChange={e => setTipo(e.target.value as 'cliente' | 'comerciante')}
            >
              <option value="cliente">Usuário / Visitante</option>
              <option value="comerciante">Comerciante Local</option>
            </select>
          </div>
          <Button type="submit" className="w-full">Cadastrar</Button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Já tem conta? <Link to="/login" className="text-blue-600 font-medium hover:underline">Entrar</Link>
        </div>
      </div>
    </div>
  );
}