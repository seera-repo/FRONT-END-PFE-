import { apiFetch } from './apiClient';
import type { Course, CourseByIdResponse } from '../types/types';

type CoursesResponse = {
  success: boolean;
  courses: Course[];
};

export async function fetchCourses(): Promise<Course[]> {
  const res = await apiFetch<CoursesResponse>('api/courses');
  if (!res.success) {
    throw new Error("Failed to fetch courses");
  }
  return res.courses;
}

export async function fetchCourseById(courseId: string): Promise<CourseByIdResponse> {
  const res = await apiFetch<CourseByIdResponse>(`api/courses/${courseId}`);
  if (!res.success) {
    throw new Error("Failed to fetch course details");
  }
  return res;
}