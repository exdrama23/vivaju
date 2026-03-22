/**
 * Serviço de integração com Google Places API
 * Busca lojas/comércios próximos ao centro padrão (Aracaju - Centro)
 */

import type { Comercio } from '@/types';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const DEFAULT_CENTER = { lat: -10.910490, lng: -37.050337 };
const SEARCH_RADIUS = 2000; // 2km de raio (cobre bem até Rua Ivo do Prado)

interface PlacesResult {
  place_id: string;
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  vicinity?: string;
  types?: string[];
}

/**
 * Busca lojas próximas ao centro padrão usando Google Places API
 * Tipos de lugar buscados: shop, point_of_interest, store, shopping_mall, etc.
 */
export async function buscarLojasDoGoogleMaps(): Promise<Comercio[]> {
  if (!GOOGLE_MAPS_API_KEY) {
    console.error('Google Maps API key não configurada');
    return [];
  }

  try {
    const comeriosList: Comercio[] = [];
    let pageToken: string | undefined;
    let iteration = 0;
    const maxIterations = 3; // Limita para não consumir muitas requisições

    // Busca em múltiplas páginas de resultados
    do {
      iteration++;
      const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
      url.searchParams.append('location', `${DEFAULT_CENTER.lat},${DEFAULT_CENTER.lng}`);
      url.searchParams.append('radius', SEARCH_RADIUS.toString());
      url.searchParams.append(
        'type',
        'shopping_mall|store|point_of_interest|establishment|local_business'
      );
      url.searchParams.append('rankby', 'prominence');
      url.searchParams.append('language', 'pt-BR');
      url.searchParams.append('key', GOOGLE_MAPS_API_KEY);

      if (pageToken) {
        url.searchParams.append('pagetoken', pageToken);
      }

      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.status === 'ZERO_RESULTS') {
        break;
      }

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        console.error('Google Places API error:', data.error_message || data.status);
        break;
      }

      // Converte resultados do Places para formato Comercio
      if (data.results && Array.isArray(data.results)) {
        for (const place of data.results as PlacesResult[]) {
          // Filtra para não incluir pontos de interesse genéricos
          if (place.name && place.geometry?.location) {
            const comercio: Comercio = {
              id: `google_${place.place_id}`,
              usuarioId: 'google_places',
              nome: place.name,
              email: '',
              telefone: '',
              categoria: categorizarPorTempo(place.types || []),
              horarioFuncionamento: 'Consultar Google Maps',
              imagem:
                'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=400&q=80',
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
              statusAberto: true,
              favoritada: false,
              tags: place.types || [],
              produtos: [],
              avaliacoes: []
            };
            comeriosList.push(comercio);
          }
        }
      }

      pageToken = data.next_page_token;

      // Aguarda um pouco antes da próxima requisição
      if (pageToken) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } while (pageToken && iteration < maxIterations);

    console.log(`Encontradas ${comeriosList.length} lojas no Google Maps`);
    return comeriosList;
  } catch (error) {
    console.error('Erro ao buscar lojas do Google Maps:', error);
    return [];
  }
}

/**
 * Mapeia tipos de lugar do Google para categorias amigáveis
 */
function categorizarPorTempo(types: string[]): string {
  const typeMap: Record<string, string> = {
    shopping_mall: 'Shopping',
    store: 'Loja',
    grocery_or_supermarket: 'Mercado',
    clothing_store: 'Vestuário',
    shoe_store: 'Calçados',
    jewelry_store: 'Joias',
    electronics_store: 'Eletrônicos',
    furniture_store: 'Móveis',
    bookstore: 'Livraria',
    pharmacy: 'Farmácia',
    beauty_salon: 'Beleza',
    restaurant: 'Alimentação',
    cafe: 'Café',
    bar: 'Bar',
    bank: 'Banco',
    atm: 'Caixa Eletrônico'
  };

  for (const type of types) {
    if (typeMap[type]) {
      return typeMap[type];
    }
  }

  return 'Varejo';
}

/**
 * Busca detalhes de um lugar específico no Google Places
 */
export async function buscarDetalhesLugar(placeId: string): Promise<Record<string, unknown> | null> {
  if (!GOOGLE_MAPS_API_KEY) {
    return null;
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.append('place_id', placeId);
    url.searchParams.append('language', 'pt-BR');
    url.searchParams.append('fields', 'name,formatted_address,formatted_phone_number,opening_hours,website,rating,reviews,photos');
    url.searchParams.append('key', GOOGLE_MAPS_API_KEY);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.status === 'OK') {
      return data.result;
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar detalhes do lugar:', error);
    return null;
  }
}
