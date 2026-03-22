/**
 * Integração Profissional com a Google Places API (v1 - New)
 */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const PLACES_NEW_URL = 'https://places.googleapis.com/v1/places:searchNearby';

export interface GooglePlace {
  id: string;
  displayName: { text: string };
  location: { latitude: number; longitude: number };
  formattedAddress: string;
  types: string[];
  rating?: number;
  userRatingCount?: number;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  regularOpeningHours?: { openNow: boolean };
  photos?: Array<{ name: string }>;
}

export async function buscarLocaisDoGoogle(lat: number, lng: number, radius: number = 1000): Promise<GooglePlace[]> {
  if (!API_KEY || API_KEY.includes('YOUR_API_KEY')) {
    console.error('❌ API KEY do Google não configurada corretamente no .env');
    return [];
  }

  try {
    console.log(`🔍 Buscando locais a ${radius}m de (${lat}, ${lng}) com Google Places API...`);
    const response = await fetch(PLACES_NEW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        // Garantindo que pedimos todos os campos necessários para os pontos e o modal
        'X-Goog-FieldMask': 'places.id,places.displayName,places.location,places.formattedAddress,places.types,places.rating,places.userRatingCount,places.internationalPhoneNumber,places.websiteUri,places.regularOpeningHours,places.photos'
      },
      body: JSON.stringify({
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: { latitude: lat, longitude: lng },
            radius: radius
          }
        },
        // 'establishment' pega praticamente TUDO que é comercial
        includedTypes: ['establishment', 'store', 'restaurant', 'parking', 'bank', 'pharmacy']
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 403) {
        console.error(
          '❌ ERRO 403: Sua API Key não tem permissão para usar a Places API (v1).\n' +
          '📍 Solução:\n' +
          '1. Acesse: https://console.cloud.google.com/\n' +
          '2. Procure por "Places API" (não "Places Web Service")\n' +
          '3. Clique em "Enable" para ativar\n' +
          '4. Verifique as restrições da sua API Key em Credentials\n' +
          'API Key: ' + API_KEY?.substring(0, 20) + '...', 
          errorData
        );
      } else {
        console.error('❌ Erro na API do Google (Status ' + response.status + '):', errorData);
      }
      return [];
    }

    const data = await response.json();
    const places = data.places || [];
    
    // Validar que todos os locais têm dados essenciais
    const validPlaces = places.filter((p: any) => 
      p?.id && 
      p?.displayName?.text &&
      p?.location?.latitude !== undefined &&
      p?.location?.longitude !== undefined
    );

    console.log(`✅ Google Places encontrou ${places.length} locais, ${validPlaces.length} válidos.`);
    return validPlaces;
  } catch (error) {
    console.error('❌ Erro na requisição Google Places:', error);
    return [];
  }
}

export function getGooglePhotoUrl(photoName: string, maxWidth: number = 800): string {
  return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidth}&key=${API_KEY}`;
}
