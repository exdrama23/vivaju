import React from 'react';
import { useData } from '@/context/DataContext';
import { ComercioCard } from '@/components/cards/ComercioCard';
import { EventoCard } from '@/components/cards/EventoCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { MapPin, TrendingUp, Calendar, Tag } from 'lucide-react';

export function Home() {
  const { comercios, eventos } = useData();

  const comerciosEmAlta = comercios.slice(0, 4);
  const proximosEventos = eventos.slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Descubra o melhor do Centro
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Encontre comércios locais, eventos culturais e estacione com facilidade. Valorize a nossa cidade.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/mapa">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Explorar Mapa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        
        {/* Comercios em Alta */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="text-blue-600" /> Em alta hoje
            </h2>
            <Link to="/comercios" className="text-blue-600 hover:underline text-sm font-medium">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {comerciosEmAlta.map(c => (
              <ComercioCard key={c.id} comercio={c} />
            ))}
          </div>
        </section>

        {/* Promoções (Mocked as tags for now) */}
        <section className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
          <div className="flex items-center gap-2 mb-6">
            <Tag className="text-amber-600 w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-900">Promoções em Destaque</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Just picking random products for the promo section */}
            {comercios.slice(0, 3).map(c => (
              <div key={c.id} className="bg-white p-4 rounded-xl shadow-sm border border-amber-200">
                <h3 className="font-semibold">{c.nome}</h3>
                <p className="text-sm text-gray-600 mt-1">{c.produtos[0]?.nome} com desconto!</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-amber-600 font-bold">R$ {c.produtos[0]?.preco.toFixed(2)}</span>
                  <Link to={`/comercios/${c.id}`}>
                    <Button size="sm" variant="outline" className="border-amber-200 hover:bg-amber-50 text-amber-700">Ver loja</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Próximos Eventos */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="text-purple-600" /> Próximos Eventos
            </h2>
            <Link to="/eventos" className="text-blue-600 hover:underline text-sm font-medium">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proximosEventos.map(e => (
              <EventoCard key={e.id} evento={e} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}