import type { Estacionamento } from '@/types/global';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/Global/Card';
import { MapPin, Car, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/Global/Button';
import { Link } from 'react-router-dom';

interface EstacionamentoCardProps {
  estacionamento: Estacionamento;
}

function statusConfig(status: Estacionamento['status']) {
  const map = {
    livre: { label: 'Aberto', cls: 'bg-[#EBF2E3] text-[#3D6B1F] border border-[#c5dba8]' },
    médio: { label: 'Fechado', cls: 'bg-[#fce8e6] text-[#c5221f] border border-[#f5c6c4]' },
    lotado: { label: 'Lotado', cls: 'bg-[#FDF0E8] text-[#E8611A] border border-[#FDDFC8]' },
  } as const;

  return map[status] ?? map.livre;
}

export function EstacionamentoCard({ estacionamento }: EstacionamentoCardProps) {
  const { label, cls } = statusConfig(estacionamento.status);
  const vagasLivres = estacionamento.numeroVagas - estacionamento.vagasOcupadas;
  const ocupacao = Math.round((vagasLivres / estacionamento.numeroVagas) * 100);
  const isFechado = estacionamento.status === 'médio';
  const horarioFuncionamento = estacionamento.horarioFuncionamento ?? '24h disponível';

  return (
    <Card className="flex h-full flex-col rounded-3xl border-[1.5px] border-[#E8E0D0] bg-[#F7F0E4] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(232,97,26,0.13),0_0_0_1.5px_#FDDFC8]">
      <CardHeader className="flex flex-row items-start justify-between gap-2 p-4.5 pb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="inline-block h-[1.5px] w-4 shrink-0 rounded-full bg-[#E8611A]" />
          </div>
          <CardTitle
            className="text-[15px] font-black text-[#0A0A0A] line-clamp-1 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {estacionamento.nome}
          </CardTitle>
          <p className="text-[11px] text-[#7A6E60] mt-1 flex items-center gap-1">
            <MapPin className="h-2.75 w-2.75" />
            Aracaju, Centro
          </p>
        </div>
        <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] ${cls}`}>
          {label}
        </span>
      </CardHeader>

      <div className="mx-4.5 h-px bg-[#E8E0D0]" />

      <CardContent className="flex-1 space-y-3 p-4.5 pt-3">
        <div className={`flex items-center justify-between rounded-[14px] border border-[#E8E0D0] bg-white p-3 ${isFechado ? 'opacity-50' : ''}`}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-[10px] ">
              <Car className="h-5.5 w-5.5 text-[#E8611A]" />
            </div>
            <div>
              <p className="text-[13px] font-black text-[#0A0A0A] leading-none">
                {vagasLivres} vagas livres
              </p>
              <div className="mt-1.5 h-1.25 w-24 overflow-hidden rounded-full bg-[#EDE3D0]">
                <div
                  className="h-full rounded-full bg-linear-to-r from-[#3D6B1F] to-[#E8611A] transition-all duration-500"
                  style={{ width: `${ocupacao}%` }}
                />
              </div>
            </div>
          </div>
          <span className="text-[10px] text-[#7A6E60] font-semibold">
            / {estacionamento.numeroVagas}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg border border-[#c5dba8] bg-[#EBF2E3]">
            <DollarSign className="w-3 h-3 text-[#3D6B1F]" />
          </div>
          <span className="text-[12px] font-bold text-[#0A0A0A]">
            R$ {estacionamento.precoHora.toFixed(2)}{' '}
            <span className="font-normal text-[#7A6E60]">/ {estacionamento.tempoPreco}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg border border-[#E8E0D0] bg-[#EDE3D0]">
            <Clock className="w-3 h-3 text-[#7A6E60]" />
          </div>
          <span className="text-[12px] text-[#7A6E60]">{horarioFuncionamento}</span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto p-4.5 pt-0">
        {isFechado ? (
          <Button
            variant="outline"
            disabled
            className="w-full rounded-full border-[1.5px] border-[#E8E0D0] bg-white text-[#E8611A] text-[12px] font-black tracking-[0.04em] transition-all disabled:cursor-not-allowed disabled:opacity-40"
          >
            Ver no Mapa →
          </Button>
        ) : (
          <Link to="/mapa" className="w-full">
            <Button
              variant="outline"
              className="w-full rounded-full border-[1.5px] border-[#E8E0D0] bg-white text-[#E8611A] text-[12px] font-black tracking-[0.04em] transition-all hover:bg-[#E8611A] hover:text-white hover:border-[#E8611A] active:scale-[0.98]"
            >
              Ver no Mapa →
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
