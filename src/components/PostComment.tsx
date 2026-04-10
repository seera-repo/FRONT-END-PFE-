////////////////////////// POST COMMENT COMPONENT ///////////////////////////////

import { formatDistanceToNow } from "date-fns";
import type { Comment } from "../types/types"; // import your backend types


////////////////////////// TYPES //////////////////////////
type PostCommentProps = {
  comment: Comment; // receive a Comment object directly
};


////////////////////////// Component //////////////////////////
export default function PostComment({ comment }: PostCommentProps) {
  return (
    <div className="flex gap-3">
      {/* COMMENT AVATAR */}
      <div className="w-10 h-10 shrink-0 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-600">
        {comment.User?.name?.slice(0, 2).toUpperCase() || "US"}
      </div>

      {/* COMMENT BUBBLE */}
      <div className="bg-[#d2d4f5]/30 border border-[#d2d4f5]/40 rounded-2xl px-4 py-3 w-full min-w-0">
        {/* HEADER */}
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-sm">{comment.User?.name || "Unknown"}</p>
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </div>

        {/* TEXT */}
        <p className="text-sm text-gray-700 wrap-break-word whitespace-pre-wrap w-full">
          {comment.comment}
        </p>
      </div>
    </div>
  );
}