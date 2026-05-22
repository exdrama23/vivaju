import { useState, type FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/Global/Button';
import { apiRequest } from '@/services/api';
import type { Usuario } from '@/types/global';
import { 
  User, 
  Store, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Info, 
  Briefcase, 
  Car, 
  Clock, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Loader2,
  ChevronRight,
  MapPinned
} from 'lucide-react';

export function Cadastro() {
  const location = useLocation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const senhaForte = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  const [tipo, setTipo] = useState<'cliente' | 'comerciante'>(location.state?.tipo || 'cliente');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Common fields
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
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

  const handleCadastro = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
      
      const endpoint = tipo === 'comerciante' ? '/login/loja' : '/login/cliente';
      await apiRequest(endpoint, {
        method: 'POST',
        data: { email, senha }
      }).catch(e => console.error("Erro no auto-login do backend", e));

      navigate('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao realizar o cadastro. Verifique os dados e tente novamente.';
      setError(
        errorMessage === 'Campos inválidos'
          ? 'Campos inválidos. A senha precisa ter no mínimo 8 caracteres, com letra maiuscula, com números e caracteres especiais.'
          : errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full bg-[var(--cream)] font-sans selection:bg-white selection:text-[var(--primary)] min-h-screen">
      
      {/* ================= LADO ESQUERDO (BRANDING) ================= */}
      <div 
        className="hidden lg:flex w-[35%] min-h-screen p-12 flex-col justify-between relative overflow-hidden bg-[var(--secondary)] sticky top-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(45, 80, 22, 0.85), rgba(45, 80, 22, 0.95)), url(https://images.unsplash.com/photo-1578319114300-47863b469837?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold mb-12 group">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Voltar ao Início
          </Link>
          
          <div className="space-y-6">
            <h1 className="text-5xl font-black text-white leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
              Junte-se à <br />
              nossa <span className="text-[var(--primary)]">comunidade</span>.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm">
              Seja como visitante ou comerciante, o VIVAJU é o seu portal para o que Aracaju tem de melhor.
            </p>
          </div>
        </div>

        <div className="relative z-10 p-6 bg-white/5 backdrop-blur-md rounded-[24px] border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
              <MapPinned className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Centro Histórico</p>
              <p className="text-white/60 text-xs">Aracaju, Sergipe</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LADO DIREITO (FORMULÁRIO) ================= */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 bg-white relative py-20 lg:py-12">
        
        <div className={`w-full ${tipo === 'comerciante' ? 'max-w-2xl' : 'max-w-md'} mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700`}>
          
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight text-[var(--black)] mb-2" style={{ fontFamily: "'Georgia', serif" }}>Criar Conta</h2>
            <p className="text-[var(--gray-text)] text-sm font-medium">Preencha os dados abaixo para começar sua jornada.</p>
          </div>

          <div className="bg-white rounded-[32px]">
            {error && (
              <div className="mb-6 p-4 bg-rose-50 text-rose-600 text-xs font-bold rounded-2xl border border-rose-100 flex items-center gap-3 animate-shake">
                <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleCadastro} className="space-y-6">
              
              {/* Seletor de Tipo */}
              <div className="space-y-2 group">
                <label className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] ml-1 group-focus-within:text-[var(--primary)] transition-colors">
                  Tipo de Conta
                </label>
                <div className="flex gap-2 p-1.5 bg-[var(--cream)] rounded-2xl border border-[var(--gray-border)]">
                  <button
                    type="button"
                    onClick={() => setTipo('cliente')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-black rounded-xl transition-all ${
                      tipo === 'cliente' ? 'bg-white shadow-lg text-[var(--primary)]' : 'text-[var(--gray-text)] hover:bg-white/50'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Visitante
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipo('comerciante')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-black rounded-xl transition-all ${
                      tipo === 'comerciante' ? 'bg-white shadow-lg text-[var(--primary)]' : 'text-[var(--gray-text)] hover:bg-white/50'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    Comerciante
                  </button>
                </div>
              </div>

              <div className={`grid grid-cols-1 ${tipo === 'comerciante' ? 'md:grid-cols-2' : ''} gap-6`}>
                {/* Nome */}
                <div className={`space-y-2 group ${tipo === 'comerciante' ? 'md:col-span-2' : ''}`}>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] ml-1 group-focus-within:text-[var(--primary)] transition-colors">
                    {tipo === 'comerciante' ? 'Nome da Loja' : 'Nome Completo'}
                  </label>
                  <div className="relative">
                    {tipo === 'comerciante' ? (
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-text)] transition-colors group-focus-within:text-[var(--primary)]" />
                    ) : (
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-text)] transition-colors group-focus-within:text-[var(--primary)]" />
                    )}
                    <input
                      type="text"
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder={tipo === 'comerciante' ? "Ex: Pastelaria do Ju" : "Seu nome completo"}
                      className="w-full pl-12 pr-4 py-3 h-14 bg-white border border-[var(--gray-border)] rounded-2xl text-base text-[var(--black)] placeholder:text-[var(--gray-text)]/50 transition-all duration-200 outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 hover:border-[var(--gray-text)]/30 disabled:opacity-50 font-medium"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2 group">
                  <label className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] ml-1 group-focus-within:text-[var(--primary)] transition-colors">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-text)] transition-colors group-focus-within:text-[var(--primary)]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full pl-12 pr-4 py-3 h-14 bg-white border border-[var(--gray-border)] rounded-2xl text-base text-[var(--black)] placeholder:text-[var(--gray-text)]/50 transition-all duration-200 outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 hover:border-[var(--gray-text)]/30 disabled:opacity-50 font-medium"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Senha */}
                <div className="space-y-2 group">
                  <label className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] ml-1 group-focus-within:text-[var(--primary)] transition-colors">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-text)] transition-colors group-focus-within:text-[var(--primary)]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full pl-12 pr-12 py-3 h-14 bg-white border border-[var(--gray-border)] rounded-2xl text-base text-[var(--black)] placeholder:text-[var(--gray-text)]/50 transition-all duration-200 outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 hover:border-[var(--gray-text)]/30 disabled:opacity-50 font-medium"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--gray-text)] hover:text-[var(--black)] transition-colors outline-none rounded-sm cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className={`ml-1 text-[11px] font-medium transition-colors ${senha && !senhaForte.test(senha) ? 'text-amber-600' : 'text-[var(--gray-text)]'}`}>
                    A senha deve ter pelo menos 8 caracteres, com letra maiúscula e minuscula, com números e caracteres especiais.
                  </p>
                </div>

                {tipo === 'comerciante' && (
                  <>
                    <div className="md:col-span-2 pt-8 border-t border-[var(--gray-border)] mt-4">
                      <div className="flex items-center gap-2 mb-6">
                        <Briefcase className="w-5 h-5 text-[var(--primary)]" />
                        <h3 className="text-xl font-bold text-[var(--black)]" style={{ fontFamily: "'Georgia', serif" }}>Informações do Comércio</h3>
                      </div>
                    </div>

                    {/* Descrição */}
                    <div className="md:col-span-2 space-y-2 group">
                      <label className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] ml-1 group-focus-within:text-[var(--primary)] transition-colors">
                        Descrição do Negócio
                      </label>
                      <div className="relative">
                        <Info className="absolute left-4 top-4 w-5 h-5 text-[var(--gray-text)] transition-colors group-focus-within:text-[var(--primary)]" />
                        <textarea
                          required
                          value={descricao}
                          onChange={(e) => setDescricao(e.target.value)}
                          placeholder="Conte um pouco sobre sua loja e o que você oferece..."
                          className="w-full pl-12 pr-4 py-4 min-h-[120px] bg-white border border-[var(--gray-border)] rounded-2xl text-base text-[var(--black)] placeholder:text-[var(--gray-text)]/50 transition-all duration-200 outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 hover:border-[var(--gray-text)]/30 disabled:opacity-50 font-medium resize-none"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Telefone */}
                    <div className="space-y-2 group">
                      <label className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] ml-1 group-focus-within:text-[var(--primary)] transition-colors">
                        Telefone de Contato
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-text)] transition-colors group-focus-within:text-[var(--primary)]" />
                        <input
                          type="tel"
                          required
                          value={telefoneContato}
                          onChange={(e) => setTelefoneContato(e.target.value)}
                          placeholder="(79) 99999-9999"
                          className="w-full pl-12 pr-4 py-3 h-14 bg-white border border-[var(--gray-border)] rounded-2xl text-base text-[var(--black)] placeholder:text-[var(--gray-text)]/50 transition-all duration-200 outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 hover:border-[var(--gray-text)]/30 disabled:opacity-50 font-medium"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="flex flex-col gap-4 justify-center">
                      <label className="flex items-center gap-3 cursor-pointer group/check">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={vendedorAmbulante}
                            onChange={(e) => setVendedorAmbulante(e.target.checked)}
                            className="peer sr-only"
                          />
                          <div className="w-6 h-6 border-2 border-[var(--gray-border)] rounded-lg transition-all peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)] group-hover/check:border-[var(--primary)]" />
                          <ChevronRight className="absolute inset-0 m-auto w-4 h-4 text-white scale-0 transition-transform peer-checked:scale-100" />
                        </div>
                        <span className="text-sm font-bold text-[var(--gray-text)] group-hover/check:text-[var(--black)] transition-colors">Sou vendedor ambulante</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group/check">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={estacionamento}
                            onChange={(e) => setEstacionamento(e.target.checked)}
                            className="peer sr-only"
                          />
                          <div className="w-6 h-6 border-2 border-[var(--gray-border)] rounded-lg transition-all peer-checked:bg-[var(--secondary)] peer-checked:border-[var(--secondary)] group-hover/check:border-[var(--secondary)]" />
                          <ChevronRight className="absolute inset-0 m-auto w-4 h-4 text-white scale-0 transition-transform peer-checked:scale-100" />
                        </div>
                        <span className="text-sm font-bold text-[var(--gray-text)] group-hover/check:text-[var(--black)] transition-colors">Possuo estacionamento</span>
                      </label>
                    </div>

                    {/* Estacionamento Info */}
                    {estacionamento && (
                      <div className="md:col-span-2 grid grid-cols-2 gap-4 p-6 bg-[var(--secondary-pale)] rounded-3xl border border-[var(--secondary-light)]/10 animate-in zoom-in-95 duration-300">
                        <div className="space-y-2 group">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--secondary)] ml-1">Preço (R$)</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={estacionamentoInfo.preco}
                              onChange={(e) => setEstacionamentoInfo({...estacionamentoInfo, preco: e.target.value})}
                              placeholder="0,00"
                              className="w-full px-4 py-3 h-12 bg-white border border-[var(--secondary-light)]/20 rounded-xl text-sm font-bold text-[var(--secondary)] outline-none focus:ring-2 focus:ring-[var(--secondary)]/20"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 group">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--secondary)] ml-1">Período</label>
                          <div className="relative">
                            <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--secondary)]/40" />
                            <input
                              type="text"
                              value={estacionamentoInfo.tempoPreco}
                              onChange={(e) => setEstacionamentoInfo({...estacionamentoInfo, tempoPreco: e.target.value})}
                              placeholder="ex: por hora"
                              className="w-full px-4 pr-10 py-3 h-12 bg-white border border-[var(--secondary-light)]/20 rounded-xl text-sm font-bold text-[var(--secondary)] outline-none focus:ring-2 focus:ring-[var(--secondary)]/20"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {!vendedorAmbulante && (
                      <>
                        <div className="md:col-span-2 pt-8 border-t border-[var(--gray-border)] mt-4">
                          <div className="flex items-center gap-2 mb-6">
                            <MapPin className="w-5 h-5 text-[var(--primary)]" />
                            <h3 className="text-xl font-bold text-[var(--black)]" style={{ fontFamily: "'Georgia', serif" }}>Localização</h3>
                          </div>
                        </div>

                        {/* CEP */}
                        <div className="space-y-2 group">
                          <label className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] ml-1 group-focus-within:text-[var(--primary)] transition-colors">
                            CEP
                          </label>
                          <input
                            type="text"
                            required={!vendedorAmbulante}
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            placeholder="00000-000"
                            className="w-full px-4 py-3 h-14 bg-white border border-[var(--gray-border)] rounded-2xl text-base text-[var(--black)] placeholder:text-[var(--gray-text)]/50 transition-all duration-200 outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 hover:border-[var(--gray-text)]/30 disabled:opacity-50 font-medium"
                          />
                        </div>

                        {/* Logradouro */}
                        <div className="space-y-2 group">
                          <label className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] ml-1 group-focus-within:text-[var(--primary)] transition-colors">
                            Logradouro
                          </label>
                          <input
                            type="text"
                            required={!vendedorAmbulante}
                            value={logradouro}
                            onChange={(e) => setLogradouro(e.target.value)}
                            placeholder="Rua, Avenida..."
                            className="w-full px-4 py-3 h-14 bg-white border border-[var(--gray-border)] rounded-2xl text-base text-[var(--black)] placeholder:text-[var(--gray-text)]/50 transition-all duration-200 outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 hover:border-[var(--gray-text)]/30 disabled:opacity-50 font-medium"
                          />
                        </div>

                        {/* Número */}
                        <div className="space-y-2 group">
                          <label className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] ml-1 group-focus-within:text-[var(--primary)] transition-colors">
                            Número
                          </label>
                          <input
                            type="text"
                            required={!vendedorAmbulante}
                            value={numEndereco}
                            onChange={(e) => setNumEndereco(e.target.value)}
                            placeholder="123"
                            className="w-full px-4 py-3 h-14 bg-white border border-[var(--gray-border)] rounded-2xl text-base text-[var(--black)] placeholder:text-[var(--gray-text)]/50 transition-all duration-200 outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 hover:border-[var(--gray-text)]/30 disabled:opacity-50 font-medium"
                          />
                        </div>

                        {/* Complemento */}
                        <div className="space-y-2 group">
                          <label className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] ml-1 group-focus-within:text-[var(--primary)] transition-colors">
                            Complemento
                          </label>
                          <input
                            type="text"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                            placeholder="Sala, Apto, etc."
                            className="w-full px-4 py-3 h-14 bg-white border border-[var(--gray-border)] rounded-2xl text-base text-[var(--black)] placeholder:text-[var(--gray-text)]/50 transition-all duration-200 outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 hover:border-[var(--gray-text)]/30 disabled:opacity-50 font-medium"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Main CTA */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-[var(--primary)]/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processando...</span>
                    </>
                  ) : (
                    tipo === 'comerciante' ? 'Cadastrar Minha Loja' : 'Criar Minha Conta'
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--gray-border)] text-center pb-12">
            <p className="text-sm text-[var(--gray-text)] font-medium">
              Já tem conta no VIVAJU? {' '}
              <Link to="/login" className="text-[var(--primary)] font-black uppercase tracking-widest text-xs hover:underline ml-1">
                Fazer Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
}