


////////////////////////// POST COMMENT COMPONENT ///////////////////////////////
import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Pencil, Trash2 ,Check, X} from "lucide-react";
import { getUser } from "../api/auth"
import type { PostComment } from "../types/types";
import Avatar from "./avatar";



//========================================= TYPES ==================================//
type Props = {
  comment: PostComment;
   onDelete: (id: string) => void;
   onUpdate: (id: string, text: string) => void;
};


//========================================= API CALLS ==================================//
export default function PostComment({ comment, onDelete, onUpdate }: Props) {
  const [showMenu, setShowMenu] = useState(false);   // controls visibility of the edit/delete menu
  const [isEditing, setIsEditing] = useState(false); // controls edit mode for the comment
  const [editedText, setEditedText] = useState(comment.comment); // stores input value when editing
  const menuRef = useRef<HTMLDivElement>(null); 
  const currentUser = getUser();              // ref for the menu button to detect outside clicks



  //=========================Ferme le menu boutton quand on clique ailleurs=============================
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


//========================================= RENDER ==================================//
  return (
    <div className="flex gap-3">

      {/* COMMENT AVATAR */}
   <Avatar 
  user={
    comment.user
      ? comment.user
      : "User" in comment && typeof (comment as Record<string, unknown>).User === "object"
        ? (comment as { User?: { name: string }; user_id: string }).User
          ? {
              id: comment.user_id,
              name: (comment as { User?: { name: string } }).User!.name,
            }
          : undefined
        : undefined
  }
  currentUserId={currentUser?.id}
  size="w-10 h-10" 
/>




      {/* COMMENT BUBBLE */}
      <div className="relative bg-[#d2d4f5]/30 border border-[#d2d4f5]/40 rounded-2xl px-4 py-3 w-full min-w-0">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-1">

          {/* NAME + TIME */}
          <div className="flex flex-col">
            <p className="font-semibold text-sm">
              {(comment as PostComment & { User?: { name: string } }).User?.name || "Unknown"}
            </p>
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>

          {/* MENU BUTTON  */}
          {currentUser?.id === comment.user_id && (
            <div className="relative" ref={menuRef}>
          
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              <MoreHorizontal size={16} />
            </button>

            {/* MENU BUTTON OPTIONS */}
            {showMenu && (
              <div className="absolute right-0 top-5 bg-white border border-gray-100 rounded-xl shadow-lg w-36 z-10 overflow-hidden">
                <button  onClick={() => {
                          setIsEditing(true);   // enter edit mode
                          setShowMenu(false);   // close menu
                        }}
                         className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-[#2F327D] hover:bg-[#702DFF]/20 transition cursor-pointer">
                <Pencil size={14}  className="text-[#2F327D]"/>
                  Edit
                </button>
                <button  onClick={() => onDelete(comment.id)} 
                         className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer">
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
          )}
      
       </div>

       {/* TEXT( COMMENT INPUT)/ EDIT MODE SWITCH */}
     {isEditing ? (
    <div className="flex flex-col gap-2">

    {/* input field for editing comment */}
    <input
      value={editedText}
      onChange={(e) => setEditedText(e.target.value)}
      className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm font-normal outline-none focus:outline-none focus:ring-0 focus:border-gray-200"
    />

    {/* action buttons */}
    <div className="flex gap-2">
      
      {/* save button (API will come next step) */}
      <button
       onClick={() => {
        onUpdate(comment.id, editedText); // call backend update
        setIsEditing(false);              // exit edit mode
      }}
        className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition cursor-pointer"
      >
        <Check size={16} />
      </button>

      {/* cancel edit */}
      <button
        onClick={() => {
          setIsEditing(false);
          setEditedText(comment.comment); // reset text
        }}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
      >
        <X size={16} />
      </button>

    </div>
  </div>
) : (
  <p className="text-sm text-gray-700 wrap-break-word whitespace-pre-wrap w-full">
    {comment.comment}
  </p>
)}
      </div>
    </div>
  );
}




