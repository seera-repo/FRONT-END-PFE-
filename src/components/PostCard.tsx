////////////////////////// POST CARD COMPONENT ///////////////////////////////

import { useState } from "react";
import PostComment from "./PostComment";
import { Heart, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { Post, PostComment as PostCommentType } from "../types/types";
import { fetchComments, addComment, likePost, deleteComment ,updateComment} from "../api/postsApi";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();
  const isLiked = post.isLikedByCurrentUser;

  
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  // ================= FETCH COMMENTS =================
  const {
    data: comments = [],
    isLoading: commentsLoading,
  } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
    enabled: showComments && !!post.id,
  });

  // ================= LIKE MUTATION =================
  const likeMutation = useMutation({
    mutationFn: () => likePost(post.id),

    onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["posts"] });
       },
  });

  // ================= ADD COMMENT MUTATION =================
  const commentMutation = useMutation({
    mutationFn: (comment: string) => addComment(post.id, comment),

    onSuccess: (newComment) => {
  queryClient.setQueryData(
    ["comments", post.id],
    (oldComments: PostCommentType[] | undefined) => [newComment, ...(oldComments || [])]
  );

  queryClient.invalidateQueries({ queryKey: ["posts"] });

  setNewComment("");
},
  });

  //========================DELETE COMMENT MUTATION =================
  
const deleteCommentMutation = useMutation({
  mutationFn: (commentId: string) => deleteComment(commentId),

  onSuccess: (_, commentId) => {
    queryClient.setQueryData(
      ["comments", post.id],
      (oldComments: PostCommentType[] | undefined) =>
        oldComments
          ? oldComments.filter((c) => c.id !== commentId)
          : []
    );
  },
});//======================== UPDATE COMMENT MUTATION =================
const updateCommentMutation = useMutation({
  mutationFn: ({ id, comment }: { id: string; comment: string }) =>
    updateComment(id, comment),

  onSuccess: (updatedComment) => {
    queryClient.setQueryData(
      ["comments", post.id],
      (old: PostCommentType[] | undefined) =>
        old?.map((c) =>
          c.id === updatedComment.id ? updatedComment : c
        )
    );
  },
});

  // ================= TOGGLE COMMENTS =================
  const toggleComments = () => setShowComments((prev) => !prev);

  // ================= SEND COMMENT =================
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    commentMutation.mutate(newComment);
  };
//========================================= RENDER ==================================//
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 w-full max-w-2xl">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600">
          {post.user?.name?.slice(0, 2).toUpperCase() || "UN"}
        </div>

        <div>
          <p className="font-semibold text-gray-800">
            {post.user?.name || "Unknown"}
          </p>

          <p className="text-sm text-gray-400">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <p className="text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap">
        {post.content}
      </p>

      {/* ACTIONS */}
      <div className="flex items-center gap-6 mb-4">

        {/* LIKE */}
        <button
          onClick={() => likeMutation.mutate()}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition cursor-pointer
            ${isLiked 
              ? "bg-red-100 text-red-500" 
              : "text-gray-600 hover:bg-gray-100"}
          `}
        >
          <Heart
            size={20}
            fill={isLiked ? "#ef4444" : "none"}
            stroke={isLiked ? "#ef4444" : "currentColor"}
          />
          <span className="text-sm">{post.likes}</span>
          </button>

        {/* COMMENTS */}
        <button
          onClick={toggleComments}
          className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-full cursor-pointer"
        >
          <MessageCircle size={20} />
        <span className="text-sm">
        {showComments ? comments.length : post.commentsCount || 0}
         </span>
        </button>
      </div>

      {/* COMMENTS SECTION */}
      {showComments && (
        <div className="border-t border-gray-200 pt-4 space-y-4">

          {/* COMMENTS LIST */}
          {commentsLoading ? (
            <p className="text-sm text-gray-400">Loading comments...</p>
          ) : (
            comments.map((c: PostCommentType) => (
              <PostComment key={c.id} comment={c}  onDelete={() => deleteCommentMutation.mutate(c.id)}  onUpdate={(id, text) =>updateCommentMutation.mutate({ id, comment: text }) } />

            ))
          )}

          {/* INPUT */}
          <div className="flex gap-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm 
              focus:outline-none focus:ring-1 focus:ring-[#4C4FC1] focus:border-[#4C4FC1] transition "
            />

            <button
              onClick={handleAddComment}
              disabled={commentMutation.isPending}
              className="px-4 py-2 rounded-full disabled:opacity-50 cursor-pointer transition"style={{ backgroundColor: "rgba(112, 45, 255, 0.2)", color: "#2F327D" }}  
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}