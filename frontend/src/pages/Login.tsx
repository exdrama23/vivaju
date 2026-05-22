import { useState, type FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/Global/Button';
import { Input } from '@/components/Global/Input';
import { apiRequest } from '@/services/api';
import { LogIn, Mail, Lock, User, Store, ShieldCheck, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import React from 'react';

function CrabModelViewer() {
  return React.createElement('model-viewer' as any, {
    src: '/Model3D/asian_shore_crab.glb',
    alt: 'Crab 3D',
    className: 'h-full w-full object-contain',
    'camera-controls': false,
    'interaction-prompt': 'none',
    'shadow-intensity': '0.8',
    exposure: '1',
    'camera-orbit': '15deg 72deg 110%', 
    'disable-zoom': true,
    'disable-pan': true,
    loading: 'eager',
  } as any);
}

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [tipo, setTipo] = useState<'cliente' | 'comerciante'>('cliente');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (email === 'admin@prefeitura.aju' && senha === 'admin123') {
      login({ id: 'pref-01', nome: 'Gestão Prefeitura', email, tipo: 'prefeitura' });
      navigate('/prefeitura');
      setLoading(false);
      return;
    }

    try {
      const endpoint = tipo === 'comerciante' ? '/login/loja' : '/login/cliente';
      const response = await apiRequest(endpoint, { method: 'POST', data: { email, senha } });
      const userData = response.data || { id: 'u-logado', nome: 'Usuário', tipo };
      if (userData?.socketToken) {
        localStorage.setItem('vivaju_socket_token', userData.socketToken);
      }
      login({ ...userData, email, tipo: (userData.tipo === 'comerciante' || tipo === 'comerciante') ? 'comerciante' : 'cliente' });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full bg-[var(--cream)] font-sans selection:bg-white selection:text-[var(--primary)]">
      
      {/* ================= LADO ESQUERDO (BRANDING) ================= */}
      <div 
        className="hidden lg:flex w-[40%] min-h-screen px-12 pt-12 pb-0 flex-col relative bg-[var(--secondary)] sticky top-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(45, 80, 22, 0.85), rgba(45, 80, 22, 0.95)), url(https://images.unsplash.com/photo-1578319114300-47863b469837?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 flex flex-col h-full">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold mb-12 group">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Voltar ao Início
          </Link>
          
          <div className="space-y-6">
            <h1 className="text-5xl font-black text-white leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
              O melhor de <br />
              <span className="text-[var(--primary)]">Aracaju</span> em um <br />
              só lugar.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm">
              Descubra comércios, culinária e eventos no coração da cidade. Sua jornada pelo Centro começa aqui.
            </p>
          </div>

          {/* Modelo 3D do Crab */}
          <div className="flex-1 w-full pointer-events-auto -mx-12 -mb-12 flex items-center justify-center" style={{ transform: 'translateY(-80px) translateX(40px)' }}>
            <CrabModelViewer />
          </div>
        </div>

      </div>

      {/* ================= LADO DIREITO (FORMULÁRIO) ================= */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 bg-white relative py-20 lg:py-12">
        
        <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="mb-1 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight text-[var(--black)] mb-2" style={{ fontFamily: "'Georgia', serif" }}>Fazer Login</h2>
            <p className="text-[var(--gray-text)] text-sm font-medium">Insira suas credenciais para acessar seu portal.</p>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-[32px]">
            {error && (
              <div className="mb-6 p-4 bg-rose-50 text-rose-600 text-xs font-bold rounded-2xl border border-rose-100 flex items-center gap-3 animate-shake">
                <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Seletor de Tipo */}
              <div className="space-y-2 group">
                <label className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] ml-1 group-focus-within:text-[var(--primary)] transition-colors">
                  Quem é você?
                </label>
                <div className="flex gap-2 p-1.5 bg-[var(--cream)] rounded-2xl border border-[var(--gray-border)]">
                  <button
                    type="button"
                    onClick={() => setTipo('cliente')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-black rounded-xl transition-all ${
                      tipo === 'cliente' ? 'bg-white shadow-lg text-[var(--primary)]' : 'text-[var(--gray-text)] hover:bg-white/50 cursor-pointer'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Visitante
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipo('comerciante')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-black rounded-xl transition-all ${
                      tipo === 'comerciante' ? 'bg-white shadow-lg text-[var(--primary)]' : 'text-[var(--gray-text)] hover:bg-white/50 cursor-pointer'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    Comerciante
                  </button>
                </div>
              </div>

              {/* Input Email */}
              <div className="space-y-2 group">
                <label htmlFor="email" className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] ml-1 group-focus-within:text-[var(--primary)] transition-colors">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-text)] transition-colors group-focus-within:text-[var(--primary)]" />
                  <input
                    id="email"
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

              {/* Input Senha */}
              <div className="space-y-2 group">
                <div className="flex justify-between items-center ml-1">
                  <label htmlFor="password" className="block text-[11px] font-black uppercase tracking-widest text-[var(--gray-text)] group-focus-within:text-[var(--primary)] transition-colors">
                    Senha
                  </label>
                  <button 
                    type="button" 
                    className="text-[11px] font-black uppercase tracking-widest text-[var(--primary)] hover:underline transition-colors outline-none cursor-pointer"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-text)] transition-colors group-focus-within:text-[var(--primary)]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="••••••••"
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
              </div>

              {/* Main CTA */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-[var(--primary)]/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Autenticando...</span>
                  </>
                ) : (
                  'Entrar na plataforma'
                )}
              </Button>
            </form>
          </div>

          <div className="-mt-4 pt-4 border-t border-[var(--gray-border)] text-center space-y-6 pb-12">
            <p className="text-xs text-[var(--gray-text)] font-medium">Ainda não faz parte do VIVAJU?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/cadastro" state={{ tipo: 'cliente' }} className="flex-1 flex items-center justify-center py-3.5 px-4 rounded-xl border-2 border-[var(--primary)] text-[var(--primary)] font-black text-[10px] uppercase tracking-widest hover:bg-[var(--primary-pale)] transition-colors cursor-pointer">
                Criar conta Visitante
              </Link>
              <Link to="/cadastro" state={{ tipo: 'comerciante' }} className="flex-1 flex items-center justify-center py-3.5 px-4 rounded-xl bg-[var(--secondary-pale)] text-[var(--secondary)] font-black text-[10px] uppercase tracking-widest hover:bg-[var(--secondary)] hover:text-white transition-all">
                Sou Comerciante
              </Link>
            </div>

            <button 
              type="button"
              onClick={() => { setEmail('admin@prefeitura.aju'); setSenha('admin123'); }}
              className="flex items-center gap-2 mx-auto text-[9px] uppercase tracking-[0.2em] text-[var(--gray-text)] hover:text-[var(--primary)] transition-colors font-black cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Acesso Restrito Prefeitura
            </button>
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