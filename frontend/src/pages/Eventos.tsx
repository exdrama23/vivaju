import { useData } from '@/context/DataContext';
import { EventoCard } from '@/components/cards/EventoCard';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export function Eventos() {
  const { eventos } = useData();
  const [mostrarTodos, setMostrarTodos] = useState(false);
  
  const eventosExibidos = mostrarTodos ? eventos : eventos.slice(0, 8);
  const temMais = eventos.length > 8;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Eventos Culturais</h1>
      
      {eventos.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhum evento encontrado.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {eventosExibidos.map(e => (
              <EventoCard key={e.id} evento={e} />
            ))}
          </div>
          
          {temMais && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => setMostrarTodos(!mostrarTodos)}
                variant="outline"
                className="px-8 py-2"
              >
                {mostrarTodos ? 'Mostrar Menos' : 'Ver Mais'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}