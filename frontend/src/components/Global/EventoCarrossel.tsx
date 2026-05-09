import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';

type Evento = {
  id: string | number;
  nome: string;
  descricao: string;
  imagem?: string;
  inicio: string;
  fim?: string;
  local?: string;
};

interface Props {
  eventos: Evento[];
  className?: string;
  autoplayMs?: number;
}

export function EventoCarrossel({ eventos, className = '', autoplayMs = 30000 }: Props) {
  const [current, setCurrent] = useState(0);
  const [state, setState]     = useState<'idle' | 'out'>('idle');
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
    <div className={`mx-4 rounded-[32px] overflow-hidden relative min-h-[320px] sm:min-h-[360px] py-4 flex flex-col justify-end bg-[var(--secondary)] ${className}`}>

      {ev.imagem && (
        <img
          key={ev.id}
          src={ev.imagem}
          alt={ev.nome}
          className="absolute inset-0 w-full h-full object-cover blur-[1.5px]"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      <div
        key={`content-${ev.id}`}
        className={`relative z-10 p-7 sm:p-10 flex flex-col gap-3 transition-all duration-400
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
          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2" style={{ fontFamily: "'Georgia', serif" }}>
            {ev.nome}
          </h3>
          <p className="text-xs sm:text-sm text-white/65 line-clamp-2 leading-relaxed max-w-lg">
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
          <button className="ml-auto bg-white text-[var(--secondary)] rounded-xl px-5 py-2 text-[11px] font-black uppercase tracking-widest transition-all hover:bg-[var(--primary-pale)] active:scale-95 whitespace-nowrap">
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
  );
}
