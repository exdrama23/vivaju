import React from 'react';
import { Estacionamento } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Car, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';

export function EstacionamentoCard({ estacionamento }: { estacionamento: Estacionamento }) {
  const vagasLivres = estacionamento.numeroVagas - estacionamento.vagasOcupadas;
  const statusColor = 
    estacionamento.status === 'livre' ? 'bg-green-100 text-green-800' :
    estacionamento.status === 'médio' ? 'bg-yellow-100 text-yellow-800' :
    'bg-red-100 text-red-800';

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg line-clamp-1">{estacionamento.nome}</CardTitle>
        </div>
        <Badge className={statusColor} variant="outline">
          {estacionamento.status.toUpperCase()}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1">
        <div className="flex items-center justify-between text-sm text-gray-700 mb-3 bg-gray-50 p-2 rounded-md">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-gray-500" />
            <span className="font-medium">{vagasLivres} vagas livres</span>
          </div>
          <span className="text-xs text-gray-500">de {estacionamento.numeroVagas}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <DollarSign className="w-4 h-4" />
          <span>R$ {estacionamento.precoHora.toFixed(2)} / hora</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>Ver distância no mapa</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
         <Link to="/mapa" className="w-full">
            <Button variant="outline" className="w-full">Encontrar</Button>
         </Link>
      </CardFooter>
    </Card>
  );
}