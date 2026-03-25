import { formatDistanceToNow } from "date-fns";

type PostCardProps = {
  content: string;
  title: string;
  createdAt: string;
  userName?: string;
};

function PostCard({ content, title, createdAt, userName }: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gray-300" />
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {userName || "Anonymous"}
          </p>
          <p className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      <h2 className="font-semibold text-gray-800 mb-1">{title}</h2>
      <p className="text-gray-700 text-sm">{content}</p>
    </div>
  );
}

export default PostCard;
