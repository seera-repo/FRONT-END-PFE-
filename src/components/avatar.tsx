import { Link } from "react-router-dom";
import type { PublicUser } from "../types/types";

type AvatarProps = {
  user?: PublicUser;
  currentUserId?: string;
  size?: string;
};

export default function Avatar({
  user,
  currentUserId,
  size = "w-12 h-12",
}: AvatarProps) {
  const initials =
    user?.name?.slice(0, 2).toUpperCase() || "??";

  // check if this avatar belongs to the logged-in user
  const isMe = user?.id && currentUserId && user.id === currentUserId;

  const avatarUI = (
    <div
      className={`${size} rounded-full flex items-center justify-center text-sm font-semibold transition bg-gray-300 text-[#2F327D] ${
        isMe ? "cursor-pointer hover:opacity-80" : "cursor-default"
      }`}
    >
      {initials}
    </div>
  );






return (
  <div className="shrink-0">
    {isMe ? (
      <Link to="/ProfileStudent">{avatarUI}</Link>
    ) : (
      avatarUI
    )}
  </div>
);





  /*
  // clickable ONLY if it's the current user
  if (isMe) {
    return <Link to="/ProfileStudent">{avatarUI}</Link>;
  }

  return avatarUI;
 */







}
