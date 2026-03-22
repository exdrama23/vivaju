import { useState, type FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { apiRequest } from '@/services/api';
import type { Usuario } from '@/types';

export function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState<'cliente' | 'comerciante'>('cliente');
  
  // Merchant specific fields
  const [descricao, setDescricao] = useState('');
  const [vendedorAmbulante, setVendedorAmbulante] = useState(false);
  const [telefoneContato, setTelefoneContato] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numEndereco, setNumEndereco] = useState('');
  const [complemento, setComplemento] = useState('');
  const [estacionamento, setEstacionamento] = useState(false);
  const [estacionamentoInfo, setEstacionamentoInfo] = useState({
    preco: '',
    tempoPreco: ''
  });

  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleCadastro = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const telefoneLimpo = telefoneContato ? telefoneContato.replace(/\D/g, '') : null;
      const cepLimpo = cep ? cep.replace(/\D/g, '') : undefined;
      const precoLimpo = estacionamentoInfo.preco ? estacionamentoInfo.preco.replace(',', '.') : '';

      if (tipo === 'comerciante') {
        await apiRequest('/loja', {
          method: 'POST',
          data: {
            nome,
            email,
            senha,
            descricao,
            vendedorAmbulante,
            telefoneContato: telefoneLimpo,
            cep: cepLimpo,
            logradouro: logradouro || undefined,
            numEndereco: numEndereco || undefined,
            complemento: complemento || undefined,
            estacionamento,
            estacionamentoInfo: estacionamento ? { ...estacionamentoInfo, preco: precoLimpo } : undefined
          }
        });
      } else {
        await apiRequest('/cliente', {
          method: 'POST',
          data: {
            nome,
            email,
            senha
          }
        });
      }

      // Em um fluxo real, poderíamos chamar o login da API logo após,
      // mas para manter a compatibilidade com a UX atual (onde loga direto):
      const userData: Usuario = {
        id: Date.now().toString(),
        nome,
        email,
        senha,
        tipo,
        ...(tipo === 'comerciante' && {
          descricao,
          vendedorAmbulante,
          telefoneContato,
          cep,
          logradouro,
          numEndereco,
          complemento,
          estacionamento,
          ...(estacionamento && { estacionamentoInfo })
        })
      };

      register(userData);
      
      // Auto-login no backend também
      const endpoint = tipo === 'comerciante' ? '/login/loja' : '/login/cliente';
      await apiRequest(endpoint, {
        method: 'POST',
        data: { email, senha }
      }).catch(e => console.error("Erro no auto-login do backend", e));

      navigate('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao realizar o cadastro. Verifique os dados e tente novamente.';
      setError(errorMessage);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border">
        <h1 className="text-2xl font-bold text-center mb-2">Criar Conta</h1>
        <p className="text-gray-500 text-center mb-6">Junte-se ao VIVAJU e explore o melhor da região</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleCadastro} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700">Tipo de conta</label>
              <div className="flex gap-4 p-1 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setTipo('cliente')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    tipo === 'cliente' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Visitante / Usuário
                </button>
                <button
                  type="button"
                  onClick={() => setTipo('comerciante')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    tipo === 'comerciante' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Comerciante Local
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700">Nome {tipo === 'comerciante' ? 'da Loja' : 'Completo'}</label>
              <Input value={nome} onChange={e => setNome(e.target.value)} placeholder={tipo === 'comerciante' ? "Ex: Pastelaria do Ju" : "Como você quer ser chamado?"} required />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-1 text-gray-700">E-mail</label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-1 text-gray-700">Senha</label>
              <Input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Mínimo 8 chars, 1 maiúscula, 1 número" required />
            </div>

            {tipo === 'comerciante' && (
              <>
                <div className="md:col-span-2 pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-4">Informações do Comércio</h3>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 text-gray-700">Descrição</label>
                  <textarea 
                    value={descricao} 
                    onChange={e => setDescricao(e.target.value)} 
                    placeholder="Conte um pouco sobre sua loja e o que você oferece..." 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-25"
                    required 
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-1 text-gray-700">Telefone de contato</label>
                  <Input value={telefoneContato} onChange={e => setTelefoneContato(e.target.value)} placeholder="(XX) XXXXX-XXXX" required />
                </div>

                <div className="md:col-span-1 flex items-center gap-2 mt-6">
                  <input 
                    type="checkbox" 
                    id="vendedorAmbulante" 
                    checked={vendedorAmbulante} 
                    onChange={e => setVendedorAmbulante(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="vendedorAmbulante" className="text-sm font-medium text-gray-700 cursor-pointer">Sou vendedor ambulante</label>
                </div>

                <div className="md:col-span-1 flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="estacionamento" 
                    checked={estacionamento} 
                    onChange={e => setEstacionamento(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="estacionamento" className="text-sm font-medium text-gray-700 cursor-pointer">Sou estacionamento</label>
                </div>

                {estacionamento && (
                  <div className="md:col-span-2 grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Preço (R$)</label>
                      <Input value={estacionamentoInfo.preco} onChange={e => setEstacionamentoInfo({...estacionamentoInfo, preco: e.target.value})} placeholder="0.00" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Tempo (ex: por hora)</label>
                      <Input value={estacionamentoInfo.tempoPreco} onChange={e => setEstacionamentoInfo({...estacionamentoInfo, tempoPreco: e.target.value})} placeholder="por hora" />
                    </div>
                  </div>
                )}

                {!vendedorAmbulante && (
                  <>
                    <div className="md:col-span-2 pt-4 border-t">
                      <h3 className="text-lg font-semibold mb-4">Localização da Loja</h3>
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1 text-gray-700">CEP</label>
                      <Input value={cep} onChange={e => setCep(e.target.value)} placeholder="00000-000" required={!vendedorAmbulante} />
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1 text-gray-700">Logradouro</label>
                      <Input value={logradouro} onChange={e => setLogradouro(e.target.value)} placeholder="Rua, Avenida..." required={!vendedorAmbulante} />
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1 text-gray-700">Número</label>
                      <Input value={numEndereco} onChange={e => setNumEndereco(e.target.value)} placeholder="123" required={!vendedorAmbulante} />
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1 text-gray-700">Complemento</label>
                      <Input value={complemento} onChange={e => setComplemento(e.target.value)} placeholder="Sala, Apto, etc." />
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold">
            {tipo === 'comerciante' ? 'Cadastrar Minha Loja' : 'Criar Minha Conta'}
          </Button>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          Já tem conta? <Link to="/login" className="text-blue-600 font-medium hover:underline">Entrar no VIVAJU</Link>
        </div>
      </div>
    </div>
  );
}