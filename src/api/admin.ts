import { apiFetch } from "./apiClient";

// ── TYPES ────────────────────────────────────────────────────────
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  isSick: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  Role?: { name: string };
};

export type AdminTeacher = {
  id: string;
  user_id: string;
  isPsychologist: boolean;
  cv_URL: string | null;
  descreption: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  User?: {
    id: string;
    name: string;
    email: string;
    Role?: { name: string };
  };
};

export type AdminCategory = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

// ── USERS ────────────────────────────────────────────────────────
export async function getAllUsers(): Promise<AdminUser[]> {
  return await apiFetch<AdminUser[]>("api/users");
}

export async function deleteUser(id: string): Promise<void> {
  await apiFetch(`api/users/${id}`, { method: "DELETE" });
}

// ── TEACHERS ─────────────────────────────────────────────────────
export async function getAllTeachers(): Promise<AdminTeacher[]> {
  return await apiFetch<AdminTeacher[]>("api/teachers");
}

export async function getPendingTeachers(): Promise<AdminTeacher[]> {
  const res = await apiFetch<{ success: boolean; teachers: AdminTeacher[] }>(
    "api/teachers/pending"
  );
  return res.teachers;
}

export async function updateTeacherStatus(
  id: string,
  status: "approved" | "rejected"
): Promise<void> {
  await apiFetch(`api/teachers/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteTeacher(id: string): Promise<void> {
  await apiFetch(`api/teachers/${id}`, { method: "DELETE" });
}

// ── CATEGORIES ───────────────────────────────────────────────────
export async function getAllCategories(): Promise<AdminCategory[]> {
  const res = await apiFetch<{ success: boolean; data: AdminCategory[] }>(
    "api/categories"
  );
  return res.data;
}

export async function createCategory(name: string): Promise<AdminCategory> {
  const res = await apiFetch<{ success: boolean; data: AdminCategory }>(
    "api/categories",
    {
      method: "POST",
      body: JSON.stringify({ name }),
    }
  );
  return res.data;
}

export async function deleteCategory(id: string): Promise<void> {
  await apiFetch(`api/categories/${id}`, { method: "DELETE" });
}