/**
 * Servicio de conexión con WordPress REST API para Historias
 * CMS: https://cms.unosiemprecambia.com
 */

export interface StoryPayload {
  historia: string;
  autor: string;
  edad?: string;
  ciudad: string;
  categoria?: string;
  tipo?: string;
}

export interface WpStoryResponse {
  success: boolean;
  message: string;
  id?: number;
}

// Detectar si estamos en el navegador en entorno local para usar el proxy de Vite y evitar bloqueo CORS
const getSubmitEndpoint = () => {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return '/api-cms/?rest_route=/amalia/v1/enviar-historia';
  }
  return 'https://cms.unosiemprecambia.com/?rest_route=/amalia/v1/enviar-historia';
};

/**
 * Enviar una historia a WordPress
 * Guarda el post en estado "pending" con sus custom fields y taxonomía
 */
export async function submitStoryToWp(data: StoryPayload): Promise<WpStoryResponse> {
  const payload = {
    historia: data.historia,
    autor: data.autor || 'Anónimo',
    edad: data.edad || '',
    ciudad: data.ciudad || '',
    categoria: data.categoria || '',
    tipo: data.tipo || ''
  };

  const response = await fetch(getSubmitEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Error del servidor (${response.status})`);
  }

  return await response.json();
}
