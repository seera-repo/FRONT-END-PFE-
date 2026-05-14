import { apiFetch } from './apiClient';
import type { Lesson } from '../types/types';

type LessonsResponse = {
  success: boolean;
  lessons: Lesson[];
};

export async function fetchLessons(courseId: string): Promise<Lesson[]> {
  const res = await apiFetch<LessonsResponse>(`api/courses/${courseId}/lessons`);
  if (!res.success) {
    throw new Error("Failed to fetch lessons");
  }
  return res.lessons;
}

export async function createLesson(courseId: string, data: {
  title: string;
  description: string;
  order_index: number;
  vedio_url: File;
}): Promise<void> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("order_index", String(data.order_index));
  formData.append("vedio_url", data.vedio_url);

  const res = await apiFetch<{ success: boolean }>(
    `api/courses/${courseId}/lessons`,
    { method: "POST", body: formData }
  );

  console.log("Create lesson response:", res);
  if (!res.success) throw new Error(`Failed to create lesson: ${data.title}`);
}