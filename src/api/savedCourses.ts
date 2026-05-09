import { apiFetch } from "./apiClient";
import type { homepageResponse } from '../types/types';

type ApiResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export async function saveCourse(courseId: string) {
  const res = await apiFetch<ApiResponse>(`api/saved-courses/${courseId}`, {
    method: 'POST',
  });

  if (!res.success) {
    throw new Error('Failed to save course');
  };
  return res.data;
}

export async function removeSavedCourse(courseId: string) {
  const res = await apiFetch<ApiResponse>(`api/saved-courses/${courseId}`, {
    method: 'DELETE',
  });
  if (!res.success) {
    throw new Error('Failed to remove saved course');
  };
  return res.message;
}

export async function getMySavedCourses(): Promise<homepageResponse>{
  const res = await apiFetch<homepageResponse>(`api/saved-courses/me`);
  if (!res.success) {
    throw new Error("Failed to fetch lessons");
  }
  return res;
}