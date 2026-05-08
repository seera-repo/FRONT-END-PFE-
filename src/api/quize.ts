import { apiFetch } from "./apiClient";
import type { Quize } from "../types/types";

export async function fetchQuizByCourse(courseId: string) {
  const res = await apiFetch<{ success: boolean; data: Quize[] }>(`api/quizes/${courseId}`);
  if (!res.success) {
    throw new Error("Failed to fetch quiz");
  }
  return res.data;
}