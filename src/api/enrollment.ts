import { apiFetch } from "./apiClient";
import type { enrollment, enrollmentResponse } from "../types/types";


export async function enrole(courseId: string): Promise<enrollment> {
  const res = await apiFetch<enrollmentResponse>(`api/enrollments/${courseId}`, {
    method: 'POST',
  });
  console.log(res);
  if (!res.success) {
    throw new Error('Failed to enroll in course');
  };
  return res.data as enrollment;
}

type ApiResponse = {
  success: boolean;
  message: string;
};

export async function removeEnrollment(courseId: string) {
  const res = await apiFetch<ApiResponse>(`api/enrollments/${courseId}`, {
    method: 'DELETE',
  });
  console.log(res);
  if (!res.success) {
    throw new Error('Failed to enroll in course');
  };
  return res.message ;
}
