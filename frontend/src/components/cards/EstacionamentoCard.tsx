import type { Estacionamento } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Car, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';

export function EstacionamentoCard({ estacionamento }: { estacionamento: Estacionamento }) {
  const vagasLivres = estacionamento.numeroVagas - estacionamento.vagasOcupadas;
  
  const statusVariant = 
    estacionamento.status === 'livre' ? 'default' :
    estacionamento.status === 'médio' ? 'secondary' :
    'destructive';

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow rounded-2xl border-[#dadce0]">
      <CardHeader className="p-5 pb-3 flex flex-row items-start justify-between">
        <div className="flex-1">
          <CardTitle className="text-base font-medium text-[#202124] line-clamp-1">{estacionamento.nome}</CardTitle>
          <p className="text-xs text-[#5f6368] mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Aracaju, Centro
          </p>
        </div>
        <Badge variant={statusVariant} className="text-[10px] uppercase tracking-wider px-2 py-0.5">
          {estacionamento.status}
        </Badge>
      </CardHeader>
      <CardContent className="p-5 pt-0 flex-1 space-y-4">
        <div className="flex items-center justify-between text-sm bg-[#f8f9fa] p-3 rounded-xl border border-[#dadce0]">
          <div className="flex items-center gap-2 text-[#202124]">
            <Car className="w-5 h-5 text-[#1a73e8]" />
            <span className="font-medium">{vagasLivres} vagas livres</span>
          </div>
          <span className="text-[11px] text-[#5f6368]">Total: {estacionamento.numeroVagas}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#5f6368]">
            <DollarSign className="w-3.5 h-3.5 text-[#1e8e3e]" />
            <span className="font-medium text-[#202124]">R$ {estacionamento.precoHora.toFixed(2)} / hora</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#5f6368]">
            <Clock className="w-3.5 h-3.5" />
            <span>24h disponível</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 mt-auto">
         <Link to="/mapa" className="w-full">
            <Button variant="outline" className="w-full rounded-full border-[#dadce0] text-[#1a73e8] hover:bg-[#e8f0fe] hover:border-transparent">
              Ver no Mapa
            </Button>
         </Link>
      </CardFooter>
    </Card>
  );
}

import { Clock } from 'lucide-react';
