import type { Evento } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export function EventoCard({ evento }: { evento: Evento }) {
  const date = new Date(evento.dataHora);
  const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      {evento.imagem && <img src={evento.imagem} alt={evento.nome} className="w-full h-40 object-cover" />}
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg line-clamp-1">{evento.nome}</CardTitle>
        <p className="text-sm text-purple-600 font-medium">{evento.categoria}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{evento.descricao}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>Ver no mapa</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto flex gap-2">
         <Link to="/mapa" className="w-full">
            <Button variant="default" className="w-full">Ver no Mapa</Button>
         </Link>
      </CardFooter>
    </Card>
  );
}