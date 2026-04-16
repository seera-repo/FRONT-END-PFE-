//userAPI
// This file contains API calls related to user data, such as fetching the current user's information.


import { apiFetch } from "./apiClient";


type MeResponse = {
  success: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export async function fetchMe() {
  const res = await apiFetch<MeResponse>("api/users/me");

  if (!res.success) {
    throw new Error("Failed to fetch user");
  }

  return res.user;  // return only the user object
}