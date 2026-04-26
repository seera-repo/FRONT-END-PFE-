import { apiFetch } from './apiClient'

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
