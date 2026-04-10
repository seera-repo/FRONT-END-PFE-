////////////////////////// POST CARD COMPONENT //////////////////////////

import { useState } from "react";
import axios from "axios";
import type { Comment } from "../types/types";
import PostComment from "./PostComment";
import { Heart, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

////////////////////////// TYPES //////////////////////////

type PostCardProps = {
  postId: string;
  content: string;
  createdAt: string;
  userName?: string;
  likes?: number;
};

////////////////////////// COMPONENT //////////////////////////

export default function PostCard({
  postId,
  content,
  createdAt,
  userName,
  likes = 0,
}: PostCardProps) {

  ////////////////////////// STATE //////////////////////////
  const [likesCount, setLikesCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  ////////////////////////// LIKE POST //////////////////////////
  const handleLike = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/posts/${postId}/like`
      );

      setLikesCount(res.data.data.likes);

    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  ////////////////////////// FETCH COMMENTS //////////////////////////
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/posts/${postId}/comments`
      );

      setComments(res.data.data);

    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  ////////////////////////// TOGGLE COMMENTS //////////////////////////
  const toggleComments = () => {
    setShowComments(!showComments);

    if (!showComments) {
      fetchComments(); // load when opening
    }
  };

  ////////////////////////// ADD COMMENT //////////////////////////
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/posts/${postId}/comments`,
        { comment: newComment }
      );

      setComments([res.data.data, ...comments]);
      setNewComment("");

    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  ////////////////////////// RENDER //////////////////////////
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 w-full max-w-2xl">

      {/* POST HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600">
          {userName?.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            {userName || "Unknown"}
          </p>
          <p className="text-sm text-gray-400">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* POST CONTENT */}
      <p className="text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap">
        {content}
      </p>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-6 mb-4">

        {/* LIKE */}
        <button
          onClick={handleLike}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
        >
          <Heart size={20} />
          <span className="text-sm">{likesCount}</span>
        </button>

        {/* COMMENT */}
        <button
          onClick={toggleComments}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-gray-600 hover:bg-gray-100 transition"
        >
          <MessageCircle size={20} />
          <span className="text-sm">{comments.length}</span>
        </button>

      </div>

      {/* COMMENTS */}
      {showComments && (
        <>
          <div className="border-t border-gray-200 my-4"></div>

          <div className="space-y-4">

            {comments.map((c) => (
            <PostComment
              key={c.id}
              comment={c}   // ✅ pass full object
/>
            ))}

            {/* INPUT */}
            <div className="flex items-center gap-3 mt-2">
              <input
                type="text"
                placeholder="Write a reply..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddComment();
                }}
                className="flex-1 bg-white rounded-full px-5 py-3 text-sm outline-none border border-[#d2d4f5] focus:border-[#2F35C2] focus:ring-1 focus:ring-[#2F35C2] transition"
              />

              <button
                onClick={handleAddComment}
                className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center text-white hover:bg-purple-800 transition"
              >
                ➤
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
}