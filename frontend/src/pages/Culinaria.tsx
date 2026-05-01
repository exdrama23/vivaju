import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { UtensilsCrossed, Waves, Coffee, Pizza, Beer, MapPin, Star } from 'lucide-react';

const categoriasCulinarias = [
  { 
    nome: 'Mercado Municipal', 
    descricao: 'O coração da gastronomia do centro. Aqui você encontra desde o famoso Pastel com Caldo de Cana até refeições completas com sarapatel, buchada e carne de sol.', 
    categoria: 'Ponto Gastronômico', 
    icone: UtensilsCrossed 
  },
  { 
    nome: 'Bares da Orla Fluvial', 
    descricao: 'Localizados próximos ao Rio Sergipe, são perfeitos para um happy hour com cerveja gelada, caranguejo e a vista privilegiada do pôr do sol no rio.', 
    categoria: 'Bares e Petiscos', 
    icone: Waves 
  },
  { 
    nome: 'Cuscuzarias e Regionais', 
    descricao: 'Restaurantes especializados no autêntico sabor sergipano: cuscuz de milho, macaxeira cozida, carne de sol e o indispensável pirão de leite.', 
    categoria: 'Comida Regional', 
    icone: Coffee 
  },
  { 
    nome: 'Lanchonetes Tradicionais', 
    descricao: 'As clássicas lanchonetes das ruas João Pessoa e Itabaianinha, famosas pelos salgados feitos na hora e sucos de frutas típicas como Mangaba e Cajá.', 
    categoria: 'Lanches Históricos', 
    icone: Pizza 
  },
  { 
    nome: 'Botecos do Centro', 
    descricao: 'Bares de esquina com décadas de história, ideais para um caldinho de sururu ou feijão, mantendo a tradição do bate-papo de balcão.', 
    categoria: 'Bares Clássicos', 
    icone: Beer 
  },
  { 
    nome: 'Pátio de Comidas do Centro', 
    descricao: 'Diversas opções de self-service e pratos feitos (PF) que atendem com rapidez e sabor o público que circula pelo comércio diariamente.', 
    categoria: 'Restaurantes', 
    icone: MapPin 
  }
];

export function Culinaria() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-7xl md:pb-0 pb-24">
      <div className="flex flex-col space-y-4 mb-8 md:mb-12">
        <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-orange-100 rounded-xl sm:rounded-2xl text-orange-600">
                <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">Gastronomia no Centro</h1>
        </div>
        <p className="text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">
          O centro de Aracaju é um mosaico de sabores. Explore os locais mais tradicionais para comer e beber, vivendo a cultura sergipana em cada prato.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {categoriasCulinarias.map((item, index) => {
          const Icon = item.icone;
          return (
            <Card key={index} className="group hover:border-orange-200 transition-all duration-300 shadow-sm hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-lg sm:text-xl font-bold">{item.nome}</CardTitle>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                    {item.categoria}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.descricao}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Seção de Restaurantes Reais Próximos ao Terminal */}
      <div className="mt-16 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurantes e Bares Próximos ao Terminal</h2>
        <p className="text-gray-500 text-sm">Estabelecimentos tradicionais localizados a poucos minutos do Terminal do Centro.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            nome: 'Restaurante Caçarola',
            local: 'Mercado Thales Ferraz (Piso Superior)',
            especialidade: 'Regional e Frutos do Mar',
            distancia: 'Aprox. 200m'
          },
          {
            nome: 'Lanchonete Americana',
            local: 'Rua João Pessoa, 185',
            especialidade: 'Salgados e Sucos Tradicionais',
            distancia: 'Aprox. 350m'
          },
          {
            nome: 'Restaurante Ancoradouro',
            local: 'Mercado Thales Ferraz',
            especialidade: 'Peixadas e Moquecas',
            distancia: 'Aprox. 200m'
          },
          {
            nome: 'Sorveteria Castelo',
            local: 'Rua João Pessoa, 114',
            especialidade: 'Sorvetes de Frutas Típicas',
            distancia: 'Aprox. 400m'
          },
          {
            nome: 'Restaurante da Neide',
            local: 'Mercado Albano Franco',
            especialidade: 'Comida Caseira e Regional',
            distancia: 'Aprox. 150m'
          },
          {
            nome: 'Bar e Restaurante Tototó',
            local: 'Orla Fluvial (Calçadão)',
            especialidade: 'Petiscos e Peixes',
            distancia: 'Aprox. 300m'
          }
        ].map((rest, index) => (
          <div key={index} className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-orange-200 transition-all group">
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-gray-900 text-base group-hover:text-orange-600 transition-colors">{rest.nome}</h3>
              <p className="text-xs text-orange-600 font-medium">{rest.especialidade}</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mt-1">
                <MapPin size={12} className="text-gray-300" />
                <span>{rest.local}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] font-bold bg-gray-50 text-gray-500 px-2 py-1 rounded-md uppercase tracking-wider">
                {rest.distancia}
              </span>
              <div className="flex items-center text-[#e8a317]">
                <Star size={10} fill="currentColor" strokeWidth={0} />
                <span className="text-[11px] font-bold ml-1">4.5+</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
