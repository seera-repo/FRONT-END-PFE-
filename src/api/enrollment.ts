import { apiFetch } from "./apiClient";
import type { enrollment, enrollmentResponse } from "../types/types";
import type { homepageResponse } from '../types/types';

type ApiResponse = {
  success: boolean;
  message: string;
};


export async function enrole(courseId: string): Promise<enrollment> {
  const res = await apiFetch<enrollmentResponse>(`api/enrollments/${courseId}`, {
    method: 'POST',
  });

  if (!res.success) {
    throw new Error('Failed to enroll in course');
  };
  return res.data as enrollment;
}

export async function removeEnrollment(courseId: string) {
  const res = await apiFetch<ApiResponse>(`api/enrollments/${courseId}`, {
    method: 'DELETE',
  });

  if (!res.success) {
    throw new Error('Failed to enroll in course');
  };
  return res.message;
}

export async function getMyEnrollment(): Promise<homepageResponse> {
  const res = await apiFetch<homepageResponse>(`api/enrollments/me`);
  console.log("Enrollment response:", res); // Debug log
  if (!res.success) {
    throw new Error("Failed to fetch lessons");
  }
  return res;
}
