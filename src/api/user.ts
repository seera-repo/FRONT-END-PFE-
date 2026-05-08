import { apiFetch } from './apiClient'
import { getToken } from './auth'

export type User = {
  id: string
  name: string
  email: string
  isSick: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

type UserResponse = {
  user: User
  success: boolean
}

export async function fetchProfileStudent(): Promise<User> {
  const res = await apiFetch<UserResponse>('api/users/me')
  
  if (!res.success) {
    throw new Error("Failed to fetch user")
  }

  return res.user
}

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



