import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { ComercioCard } from '@/components/cards/ComercioCard';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';

export function Comercios() {
  const { comercios } = useData();
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState('');

  const categorias = Array.from(new Set(comercios.map(c => c.categoria)));

  const filteredComercios = comercios.filter(c => {
    const matchesSearch = c.nome.toLowerCase().includes(search.toLowerCase()) || 
                          c.produtos.some(p => p.nome.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = categoria ? c.categoria === categoria : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Comércios Locais</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Buscar por nome ou produto..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="h-10 rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Todas as Categorias</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredComercios.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhum comércio encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredComercios.map(c => (
            <ComercioCard key={c.id} comercio={c} />
          ))}
        </div>
      )}
    </div>
  );
}