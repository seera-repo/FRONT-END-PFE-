import { apiFetch } from './apiClient';
import type { Course, CourseByIdResponse } from '../types/types';

type CoursesResponse = {
  success: boolean;
  courses: Course[];
};


// Define the filter shape
interface CourseFilters {
  categorie_id?: string;
  isSpecialized?: boolean;
  teacher_id?: string;
  search?: string;
}

export async function fetchCourses(filters?: CourseFilters): Promise<Course[]> {
  // Build query string only from filters that were actually passed
  const params = new URLSearchParams();

  //check filters 
  if (filters?.categorie_id !== undefined) {
    params.append('categorie_id', filters.categorie_id);
  }
  if (filters?.isSpecialized !== undefined) {
    params.append('isSpecialized', String(filters.isSpecialized));
  }
  if (filters?.teacher_id !== undefined) {
    params.append('teacher_id', filters.teacher_id);
  }
  if (filters?.search) {
    params.append('search', filters.search);
  }

  const query = params.toString(); 
  const url = query ? `api/courses?${query}` : 'api/courses';

  const res = await apiFetch<CoursesResponse>(url);
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