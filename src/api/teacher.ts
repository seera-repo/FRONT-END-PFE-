import { apiFetch } from "./apiClient";
import type { TeacherProfile } from "../types/types";

export async function getMyTeacherProfile() {
  const res = await apiFetch<{ success: boolean; teacher: TeacherProfile | null }>(`api/teachers/me`);
  if (!res.success) throw new Error("Failed to fetch teacher profile");
  console.log("Teacher profile response:", res); // Debug log
  return res.teacher;
}

export async function createTeacherProfile(data: {
  isPsychologist: boolean;
  descreption: string;
  cvFile: File;
}) {
  const formData = new FormData();
  formData.append("isPsychologist", String(data.isPsychologist));
  formData.append("descreption", data.descreption);
  formData.append("cv_URL", data.cvFile); // ← must match req.file field name

  const res = await apiFetch<{ success: boolean; teacher: TeacherProfile }>(
    "api/teachers",
    { method: "POST", body: formData }
  );
  console.log("Create teacher profile response:", res); // Debug log
  if (!res.success) throw new Error("Failed to create teacher profile");
  return res.teacher;
}