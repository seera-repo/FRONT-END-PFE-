import { apiFetch } from './apiClient';
interface User {
  id: string
  name: string
  email: string
  isSick: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

interface UserResponse {
  user: User
  success: boolean
}
export async function fetchProfileStudent(): Promise<User> {
  const res = await apiFetch<UserResponse>("api/users/me");
  if (!res.success) {
    throw new Error("Failed to fetch user");
  }
  return res.user;
}