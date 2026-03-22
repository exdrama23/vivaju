import type { Evento } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export function EventoCard({ evento }: { evento: Evento }) {
  const startDate = new Date(evento.inicio);
  const endDate = new Date(evento.fim);
  
  const formattedStart = startDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  const formattedEndTime = endDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      {evento.imagem && <img src={evento.imagem} alt={evento.nome} className="w-full h-32 sm:h-40 object-cover" />}
      <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
        <CardTitle className="text-base sm:text-lg line-clamp-1">{evento.nome}</CardTitle>
        <p className="text-xs sm:text-sm text-purple-600 font-medium">{evento.categoria}</p>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-0 flex-1">
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2 sm:mb-3">{evento.descricao}</p>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500 mb-1">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{formattedStart} - {formattedEndTime}</span>
        </div>
        {evento.localizacao && (
          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="line-clamp-1">{evento.localizacao}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0 mt-auto">
         <Link to="/mapa" className="w-full">
            <Button variant="default" className="w-full h-9 sm:h-10 text-xs sm:text-sm">Ver no Mapa</Button>
         </Link>
      </CardFooter>
    </Card>
  );
}