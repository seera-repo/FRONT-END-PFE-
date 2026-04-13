// import { apiFetch } from './apiClient';
// import type { Lesson } from '../types/types';

// type LessonsResponse = {
//   success: boolean;
//   lessons: Lesson[];
// };

// export async function fetchLessons(courseId: string): Promise<Lesson[]> {
//   const res = await apiFetch<LessonsResponse>(`api/courses/${courseId}/lessons`);
//   if (!res.success) {
//     throw new Error("Failed to fetch lessons");
//   }
//   return res.lessons;
// }