export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:2923';

interface ApiRequestOptions extends RequestInit {
  data?: any;
}

export async function apiRequest<T = any>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  const { data, headers, ...restOptions } = options;

  const fetchOptions: RequestInit = {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    // * Ensures cookies are sent with requests for auth
    credentials: 'included' as RequestCredentials,
  };

  if (fetchOptions.credentials === 'included') {
     fetchOptions.credentials = 'include';
  }

  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);

  let responseData;
  try {
    responseData = await response.json();
  } catch (err) {
    responseData = null;
  }

  if (!response.ok) {
    const errorMessage = responseData?.error || responseData?.message || 'Erro na requisição';
    throw new Error(errorMessage);
  }

  return responseData;
}
