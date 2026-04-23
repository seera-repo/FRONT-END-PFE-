import { apiFetch } from "./apiClient";
import { getToken } from "./auth";


export async function updateUser(userData: any): Promise<void> {
  const res = await apiFetch<{ success: boolean }>('api/users/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      name: userData.name,
      isSick: userData.isSick,
    })
  });
  if (!res.success) {
    throw new Error('Failed to update user');
  }

}