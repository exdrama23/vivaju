/**
 * Serviços de geolocalização e imagens de rua usando APIs gratuitas
 */

const MAPILLARY_ACCESS_TOKEN = import.meta.env.VITE_MAPILLARY_ACCESS_TOKEN as string | undefined;

// Nominatim (OpenStreetMap) - Reverse Geocoding
// Documentação: https://nominatim.org/release-docs/latest/api/Reverse/
export async function buscarEnderecoDaNominatim(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'pt-BR',
          'User-Agent': 'VivaJu-App-v1.0' // Requisito da política de uso do Nominatim
        }
      }
    );
    const data = await response.json();
    return data.display_name || 'Endereço não encontrado';
  } catch (error) {
    console.error('Erro Nominatim:', error);
    return 'Erro ao carregar endereço';
  }
}

// Mapillary - Street View imagens próximas ao ponto
export async function buscarFotosDaMapillary(lat: number, lng: number): Promise<string | null> {
  try {
    if (!MAPILLARY_ACCESS_TOKEN) {
      return null;
    }

    // Bounding box aproximado para encontrar imagens próximas da loja.
    const delta = 0.001;
    const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;

    const response = await fetch(
      `https://graph.mapillary.com/images?bbox=${bbox}&fields=id,thumb_256_url,thumb_1024_url,captured_at&limit=1`,
      {
        headers: {
          Authorization: `OAuth ${MAPILLARY_ACCESS_TOKEN}`
        }
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const firstImage = data?.data?.[0];
    return firstImage?.thumb_1024_url ?? firstImage?.thumb_256_url ?? null;

    /* Exemplo alternativo de busca detalhada por id:
    const imageId = data?.data?.[0]?.id;
    const detailResponse = await fetch(`https://graph.mapillary.com/${imageId}?fields=thumb_2048_url`, {
      headers: { Authorization: `OAuth ${MAPILLARY_ACCESS_TOKEN}` }
    });
    */
  } catch (error) {
    console.error('Erro Mapillary:', error);
    return null;
  }
}
