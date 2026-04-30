import { apiFetch } from './apiClient';
import type { CommentsResponse, CourseComment, apicommntResponse } from '../types/types';


export async function fetchCommentsByCourse(courseId: string): Promise<CommentsResponse> {
  return apiFetch(`api/course-comments/course/${courseId}`);
}

export async function addComment(
  courseId: string,
  comment: string
): Promise<CourseComment> {
  const res = await apiFetch<apicommntResponse>(
    `api/course-comments/course/${courseId}`,
    {
      method: 'POST',
      body: JSON.stringify({ comment }),
    }
  );
  console.log("API Response for adding comment:", res); // Debug log
  if (!res.success) {
    throw new Error('Failed to add comment');
  }

  return res.data as CourseComment;
}