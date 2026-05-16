import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Calendar, Clock, X } from 'lucide-react';

type Evento = {
  id: string | number;
  nome: string;
  descricao: string;
  imagem?: string;
  inicio: string;
  fim?: string;
  local?: string;
};

// Modal de Detalhes do Evento
function EventoModal({ isOpen, onClose, evento }: { isOpen: boolean; onClose: () => void; evento: Evento }) {
  if (!isOpen || !evento) return null;

  const dataInicio = new Date(evento.inicio);
  const dataFim = evento.fim ? new Date(evento.fim) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-0">
      <div className="bg-white w-full max-w-md rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Botão Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-[#3c4043] hover:bg-white transition-colors shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Imagem */}
        <div className="w-full h-56 bg-[#f1f3f4] relative shrink-0">
          <img 
            src={evento.imagem || 'https://images.unsplash.com/photo-1540575467063-178f50002cbc?auto=format&fit=crop&w=600&q=80'} 
            alt={evento.nome}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Corpo Rolável */}
        <div className="flex-1 overflow-y-auto pb-6">
          {/* Título */}
          <div className="px-5 pt-5 pb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary)] text-white text-[9px] font-black uppercase tracking-widest mb-3">
              Evento
            </span>
            <h2 className="text-2xl font-medium text-[#202124] mb-2" style={{ fontFamily: "'Georgia', serif" }}>
              {evento.nome}
            </h2>
            <p className="text-sm text-[#5f6368] leading-relaxed">
              {evento.descricao}
            </p>
          </div>

          {/* Informações */}
          <div className="px-4 py-2 flex flex-col border-t border-[#e8eaed]">
            {/* Data */}
            <div className="flex items-start gap-4 py-3 min-h-[48px] border-b border-[#e8eaed] hover:bg-[#f8f9fa] transition-colors px-1">
              <div className="mt-0.5">
                <Calendar className="w-5 h-5 text-[#5f6368]" />
              </div>
              <div className="flex-1 text-sm text-[#3c4043]">
                <p className="font-medium text-[#1e8e3e] mb-1">Data</p>
                <p className="text-[#5f6368]">
                  {dataInicio.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
                {dataFim && (
                  <p className="text-[11px] text-[#5f6368] mt-1">
                    até {dataFim.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                )}
              </div>
            </div>

            {/* Hora */}
            <div className="flex items-start gap-4 py-3 min-h-[48px] border-b border-[#e8eaed] hover:bg-[#f8f9fa] transition-colors px-1">
              <div className="mt-0.5">
                <Clock className="w-5 h-5 text-[#5f6368]" />
              </div>
              <div className="flex-1 text-sm text-[#3c4043]">
                <p className="font-medium text-[#1e8e3e] mb-1">Horário</p>
                <p className="text-[#5f6368]">
                  {dataInicio.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  {dataFim && ` até ${dataFim.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}
                </p>
              </div>
            </div>

            {/* Local */}
            {evento.local && (
              <div className="flex items-start gap-4 py-3 min-h-[48px] last:border-0 hover:bg-[#f8f9fa] transition-colors px-1">
                <div className="mt-0.5">
                  <MapPin className="w-5 h-5 text-[#5f6368]" />
                </div>
                <div className="flex-1 text-sm text-[#3c4043]">
                  <p className="font-medium text-[#1e8e3e] mb-1">Local</p>
                  <p className="text-[#5f6368] leading-relaxed">
                    {evento.local}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Botão Ação */}
          <div className="px-5 pt-6 pb-2">
            <button 
              onClick={onClose}
              className="w-full bg-[var(--primary)] text-white px-5 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  eventos: Evento[];
  className?: string;
  autoplayMs?: number;
}

export function EventoCarrossel({ eventos, className = '', autoplayMs = 30000 }: Props) {
  const [current, setCurrent] = useState(0);
  const [state, setState]     = useState<'idle' | 'out'>('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextIdx  = useRef(0);

  const goTo = useCallback((idx: number) => {
    const target = ((idx % eventos.length) + eventos.length) % eventos.length;
    if (target === current) return;
    nextIdx.current = target;
    setState('out');
  }, [current, eventos.length]);

  useEffect(() => {
    if (state !== 'out') return;
    const t = setTimeout(() => {
      setCurrent(nextIdx.current);
      setState('idle');
    }, 420);
    return () => clearTimeout(t);
  }, [state]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo(current + 1), autoplayMs);
  }, [current, goTo, autoplayMs]);

  useEffect(() => { resetTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [resetTimer]);

  if (!eventos.length) return null;

  const ev = eventos[current];

  return (
    <>
      <div className={`mx-4 rounded-[32px] overflow-hidden relative min-h-[320px] sm:min-h-[360px] py-4 flex flex-col justify-end bg-[var(--secondary)] ${className}`}>

      {ev.imagem && (
        <img
          key={ev.id}
          src={ev.imagem}
          alt={ev.nome}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

      <div
        key={`content-${ev.id}`}
        className={`relative z-20 p-7 sm:p-10 flex flex-col gap-3 transition-all duration-400
          ${state === 'out' ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[var(--primary)] text-[9px] font-black text-white uppercase tracking-widest">
            Live
          </span>
          <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-[0.18em]">
            Agenda Cultural
          </span>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2 drop-shadow-md" style={{ fontFamily: "'Georgia', serif" }}>
            {ev.nome}
          </h3>
          <p className="text-xs sm:text-sm text-white/90 line-clamp-2 leading-relaxed max-w-lg drop-shadow-sm">
            {ev.descricao}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center mt-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10">
            <Calendar className="w-3 h-3 text-white/70" />
            <span className="text-[11px] font-bold text-white uppercase tracking-wide">
              {new Date(ev.inicio).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 border border-white/5">
            <Clock className="w-3 h-3 text-white/70" />
            <span className="text-[11px] font-bold text-white uppercase tracking-wide">
              {new Date(ev.inicio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          {ev.local && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 border border-white/5">
              <MapPin className="w-3 h-3 text-white/70" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wide truncate max-w-[120px]">
                {ev.local}
              </span>
            </div>
          )}
          <button className="ml-auto bg-white text-[var(--secondary)] rounded-xl px-5 py-2 text-[11px] font-black uppercase tracking-widest transition-all hover:bg-[var(--primary-pale)] active:scale-95 whitespace-nowrap cursor-pointer" onClick={() => setIsModalOpen(true)}>
            Ver Detalhes 
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 right-5 flex items-center gap-2.5 z-20">
        <div className="flex gap-1.5 items-center">
          {eventos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="h-1.5 rounded-full border-none transition-all duration-300"
              style={{ width: i === current ? 20 : 6, background: i === current ? 'var(--primary)' : 'rgba(255,255,255,0.3)' }}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold text-white/40 tracking-wide">
          {current + 1} / {eventos.length}
        </span>
      </div>
      </div>

      <EventoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        evento={ev} 
      />
    </>
  );
}