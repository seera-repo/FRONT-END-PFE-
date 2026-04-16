import { getToken } from "./auth";
const BASE_URL = 'http://localhost:3000';


export async function apiFetch<T>(endPoint: string, options?: RequestInit): Promise<T> {
  const token = getToken(); 
  const res = await fetch(`${BASE_URL}/${endPoint}`,{
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // ✅ safe
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}