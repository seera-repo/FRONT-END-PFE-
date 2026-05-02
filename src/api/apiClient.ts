import { getToken } from "./auth";
const BASE_URL = 'http://localhost:3000';


export async function apiFetch<T>(endPoint: string, options?: RequestInit): Promise<T> {
  const TOKEN = getToken();
  
  const isFormData = options?.body instanceof FormData;

  const res = await fetch(`${BASE_URL}/${endPoint}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${TOKEN}`,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}