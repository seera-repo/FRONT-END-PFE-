////////////////////////// POST COMMENT COMPONENT ///////////////////////////////

import { formatDistanceToNow } from "date-fns";

type PostCommentProps = {
  userName?: string;
  commentText: string;
  createdAt: string;
};

export default function PostComment({ userName, commentText, createdAt }: PostCommentProps) {
  return (
    <div className="flex gap-3">
      {/* COMMENT AVATAR */}
      <div className="w-10 h-10 shrink-0 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-600">
        {userName?.slice(0, 2).toUpperCase()}
      </div>

      {/* COMMENT BUBBLE */}
      <div className="bg-[#d2d4f5]/30 border border-[#d2d4f5]/40 rounded-2xl px-4 py-3 w-full min-w-0">
        {/* HEADER */}
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-sm">{userName}</p>
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </span>
        </div>

        {/* TEXT */}
        <p className="text-sm text-gray-700 wrap-break-word whitespace-pre-wrap w-full">{commentText}</p>
      </div>
    </div>
  );
}