const BASE_URL = 'http://localhost:3000';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3ZWU5MGNhLTcxZGMtNGMyNy1hMjViLWYwMGNhYzNlODJkNyIsInJvbGUiOiJUZWFjaGVyIiwiaWF0IjoxNzc1NTY0MTQ0LCJleHAiOjE3NzYxNjg5NDR9.9NjdksjsyjyUznWbJHSiLodtq57h0dy4Q0lzymoT55g';

export async function apiFetch<T>(endPoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}/${endPoint}`,{
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
      ...options?.headers,
    }
  })
  if(!res.ok){
    throw new Error(`API request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}