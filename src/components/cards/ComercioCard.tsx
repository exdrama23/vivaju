import React from 'react';
import { Comercio } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function ComercioCard({ comercio }: { comercio: Comercio }) {
  const mediaAvaliacoes = comercio.avaliacoes.length
    ? comercio.avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / comercio.avaliacoes.length
    : 0;

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <img src={comercio.imagem} alt={comercio.nome} className="w-full h-40 object-cover" />
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg line-clamp-1">{comercio.nome}</CardTitle>
          <div className="flex items-center gap-1 text-sm font-medium text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">
            <Star className="w-3.5 h-3.5 fill-current" />
            {mediaAvaliacoes > 0 ? mediaAvaliacoes.toFixed(1) : 'Novo'}
          </div>
        </div>
        <p className="text-sm text-gray-500">{comercio.categoria}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1">
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>Centro Urbano</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {comercio.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Link to={`/comercios/${comercio.id}`} className="w-full">
          <Button variant="outline" className="w-full">Ver detalhes</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}