import { apiFetch } from './apiClient';
import type { CommentsResponse } from '../types/types';


export async function fetchCommentsByCourse(courseId: string): Promise<CommentsResponse> {
  return apiFetch(`api/course-comments/course/${courseId}`);
}