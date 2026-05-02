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
export type myCourse = {
  id: string;
  title: string;
  description: string;
  document: string | null;
  image_url: string | null;
  isSpecialized: boolean;
  teacher_id: string;
  categorie_id: string;
  likes: number;
  students: number;
  createdAt: string;
  updatedAt: string;
  Teacher: {
    id: string;
    user_id: string;
    isPsychologist: boolean;
    cv_URL: string;
    descreption: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  Categorie: {
    name: string;
  };
};


type myCoursesResponse = {
  success: boolean;
  courses: myCourse[];
};
export async function fetchMyCourses(): Promise<myCourse[]> {
  const res = await apiFetch<myCoursesResponse>('api/courses/my-courses');
  if (!res.success) {
    throw new Error("Failed to fetch my courses");
  }
  return res.courses;
}

export async function createCourse(data: {
  title: string;
  description: string;
  isSpecialized: boolean;
  categorie_id: string;
  imageFile: File | null;
  docFile: File | null;
}): Promise<{ success: boolean; course: { id: string } }> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("isSpecialized", String(data.isSpecialized));
  formData.append("categorie_id", data.categorie_id);
  if (data.imageFile) formData.append("image_url", data.imageFile);
  if (data.docFile) formData.append("document", data.docFile);

  const res = await apiFetch<{ success: boolean; course: { id: string } }>(
    "api/courses",
    { method: "POST", body: formData }
  );
  console.log("Create course response:", res);
  if (!res.success) throw new Error("Failed to create course");
  return res;
}
