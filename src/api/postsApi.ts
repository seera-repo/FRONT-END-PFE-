import { apiFetch } from "./apiClient";
import type { Post, PostComment } from "../types/types";


// ========================= POSTS API =========================



///////////////////////////////////////GET POSTS////////////////////////////////////

type BackendPost = Post & {
  User?: {
    name: string;
  };
};

type PostsResponse = {
  success: boolean;
  count: number;
  data: BackendPost[];
};

export async function fetchPosts(): Promise<Post[]> {
  const res = await apiFetch<PostsResponse>("api/posts");

  if (!res.success) throw new Error("Failed to fetch posts");

  return res.data.map((post) => ({
    ...post,
    user: post.User
      ? {
          id: post.user_id,      
          name: post.User.name,   
        }
      : undefined,
  }));
}
///////////////////////////////////CREATE POST///////////////////////////////////

export type CreatePostInput = {
  title: string;
  content: string;
};

export type PostResponse = {
  success: boolean;
  data: Post;
};

/**
 * Create a post (POST /api/posts)
 */
export function createPost(data: CreatePostInput): Promise<PostResponse> {
  return apiFetch<PostResponse>("api/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

///////////////////////////////////LIKE POST///////////////////////////////////

type LikeResponse = {
  success: boolean;
  data: Post;
};

export async function likePost(postId: string) {
  const res = await apiFetch<LikeResponse>(`api/posts/${postId}/like`, {
    method: "PATCH",
  });

  if (!res.success) throw new Error("Failed to like post");

  return res.data;
}

//////////////////////////////////DELETE POST///////////////////////////////////
type DeleteResponse = {
  success: boolean;
  message: string;
};

export async function deletePost(postId: string) {
  const res = await apiFetch<DeleteResponse>(`api/posts/${postId}`, {
    method: "DELETE",
  });

  if (!res.success) throw new Error("Failed to delete post");

  return res;
}


//========================= COMMENTS API =========================


//////////////////////////////////GET COMMENTS///////////////////////////////////
type CommentsResponse = {
  success: boolean;
  count: number;
  data: PostComment[];
};

export async function fetchComments(postId: string): Promise<PostComment[]> {
  const res = await apiFetch<CommentsResponse>(
    `api/comments/post/${postId}`
  );

  if (!res.success) throw new Error("Failed to fetch comments");

  return res.data;
}

//////////////////////////////////CREATE COMMENT///////////////////////////////////
type CreateCommentResponse = {
  success: boolean;
  data: PostComment;
};

export async function addComment(postId: string, comment: string) {
  const res = await apiFetch<CreateCommentResponse>(
    `api/comments/${postId}`,
    {
      method: "POST",
      body: JSON.stringify({ comment }),
    }
  );

  if (!res.success) throw new Error("Failed to add comment");

  return res.data;
}

//////////////////////////////////DELETE COMMENT///////////////////////////////////
export async function deleteComment(commentId: string) {
  const res = await apiFetch<DeleteResponse>(
    `api/comments/${commentId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.success) throw new Error("Failed to delete comment");

  return res;
}
///////////////////////////////////////EDIT COMMENT///////////////////////////////////
//////////////////////////////////update comment///////////////////////////////////

type UpdateCommentResponse = {
  success: boolean;
  data: PostComment;
};

export async function updateComment(commentId: string, comment: string) {
  const res = await apiFetch<UpdateCommentResponse>(
    `api/comments/${commentId}`,
    {
      method: "PUT",
      body: JSON.stringify({ comment }),
    }
  );

  if (!res.success) throw new Error("Failed to update comment");

  return res.data;
}