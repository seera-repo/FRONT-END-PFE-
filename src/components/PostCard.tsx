////////////////////////// POST CARD COMPONENT ///////////////////////////////

import { useState } from "react";
import PostComment from "./PostComment";
import { Heart, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Comment = {
  id: string;
  comment: string;
  createdAt: string;
  userName?: string;
};

type PostCardProps = {
  content: string;
  createdAt: string;
  userName?: string;
  likes?: number;
  initialComments?: Comment[];
};

export default function PostCard({
  content,
  createdAt,
  userName,
  likes = 0,
  initialComments = [],
}: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // LIKE BUTTON
  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  // TOGGLE COMMENT SECTION
  const toggleComments = () => setShowComments(!showComments);

  // ADD NEW COMMENT
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        comment: newComment,
        createdAt: new Date().toISOString(),
        userName: userName || "You",
      },
    ]);

    setNewComment("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 w-full max-w-2xl">

      {/* POST HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600">
          {userName?.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{userName}</p>
          <p className="text-sm text-gray-400">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* POST CONTENT */}
      <p className="text-gray-800 leading-relaxed mb-4 wrap-break-word whitespace-pre-wrap">{content}</p>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-6 mb-4">
        {/* LIKE */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
            liked ? "bg-red-100 text-red-500" : "bg-transparent text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Heart size={20} className={liked ? "fill-red-500 text-red-500" : ""} />
          <span className="text-sm">{likesCount}</span>
        </button>

        {/* COMMENT TOGGLE */}
        <button
          onClick={toggleComments}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-gray-600 hover:bg-gray-100 transition"
        >
          <MessageCircle size={20} />
          <span className="text-sm">{comments.length}</span>
        </button>
      </div>

      {/* COMMENTS SECTION */}
      {showComments && (
        <>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="space-y-4">
            {comments.map((c) => (
              <PostComment
                key={c.id}
                commentText={c.comment}
                userName={c.userName}
                createdAt={c.createdAt}
              />
            ))}

            {/* COMMENT INPUT */}
            <div className="flex items-center gap-3 mt-2">
              <input
                type="text"
                placeholder="Write a reply..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleAddComment(); }}
                className="flex-1 bg-white rounded-full px-5 py-3 text-sm outline-none border border-[#d2d4f5] focus:border-[#2F35C2] focus:ring-1 focus:ring-[#2F35C2] transition"
              />
              <button
                onClick={handleAddComment}
                className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center text-white text-lg hover:bg-purple-800 transition"
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