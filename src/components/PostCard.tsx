////////////////////////// POST CARD COMPONENT ///////////////////////////////

import { useState,useRef,useEffect, useLayoutEffect } from "react";
import PostComment from "./PostComment";
import { getUser } from "../api/auth";
import { Check, Heart, MessageCircle,MoreHorizontal,Pencil, Trash2,X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post, PostComment as PostCommentType } from "../types/types";
import { fetchComments, addComment, likePost, deleteComment ,updateComment, deletePost,updatePost} from "../api/postsApi";
import Avatar from "../components/avatar";


//========================================= TYPES ==================================//
type PostCardProps = {
  post: Post;
};




//========================================= API CALLS ==================================//
export default function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isLiked = post.isLikedByCurrentUser;
  const currentUser = getUser();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedPostText, setEditedPostText] = useState(post.content);
  const menuRef = useRef<HTMLDivElement>(null);


  //======================== AUTO-RESIZE TEXTAREA FOR EDITING POST =================
   useLayoutEffect(() => {
  if (isEditingPost && textareaRef.current) {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }
}, [isEditingPost, editedPostText]);
  

//==================================FERME LE MENU QUAND ON CLIQUE AILLEURS=============================
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setShowMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
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
//========================DELETE POST MUTATION =================
const deletePostMutation = useMutation({
  mutationFn: (postId: string) => deletePost(postId),

  onSuccess: (_, postId) => {
    queryClient.setQueryData(
      ["posts"],
      (oldPosts: Post[] | undefined) =>
        oldPosts ? oldPosts.filter((p) => p.id !== postId) : []
    );
  },
});
//============================== EDIT POST MUTATION =================
const updatePostMutation = useMutation({
  mutationFn: (content: string) => updatePost(post.id, content),
  onSuccess: (updatedPost) => {
    queryClient.setQueryData(
      ["posts"],
      (oldPosts: Post[] | undefined) =>
        oldPosts?.map((p) => p.id === updatedPost.id ? { ...p, content: updatedPost.content } : p)
    );
    setIsEditingPost(false);
    setShowMenu(false);
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
      <div className="flex justify-between items-start mb-4">

        {/* LEFT SIDE (avatar + name + time) */}
        <div className="flex items-center gap-3">

          {/* AVATAR */}
          <Avatar user={post.user} currentUserId={currentUser?.id}  />

          {/* NAME + TIME */}
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

        

        {/* RIGHT SIDE (MENU BUTTON) */}
        {currentUser?.id === post.user_id && (
         <div className="relative " ref={menuRef}>

          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer">
          
           <MoreHorizontal size={16} />
          </button>

          {/* MENU */}
          {showMenu && (
            <div className="absolute right-0 top-5 bg-white border border-gray-100 rounded-xl shadow-lg w-36 z-10">
              <button onClick={() => { setIsEditingPost(true); setShowMenu(false); }}
                  
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-[#2F327D] hover:bg-[#702DFF]/20 transition cursor-pointer">
              <Pencil size={14}  className="text-[#2F327D]"/>
                Edit
              </button>
           <button
            onClick={() => deletePostMutation.mutate(post.id)}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer">
                  <Trash2 size={14} />
            Delete
          </button>
            </div>
          )}
        </div>
        )}
      </div> 

       

      {/* POST TITLE */}
        {post.title && (
  <h2 className="text-[17px] font-semibold text-gray-800 tracking-tight leading-snug mb-3 wrap-break-word">
    {post.title}
  </h2>
)}


      {/* CONTENT */}

     {isEditingPost ? (
    <div className="mb-4 flex flex-col gap-2">
    <textarea
       ref={textareaRef}
      value={editedPostText}
      onChange={(e) => setEditedPostText(e.target.value)}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm transition resize-none overflow-hidden outline-none"/>
        
      
      
    
     <div className="flex justify-end gap-2">
      <button
        onClick={() => { setIsEditingPost(false); setEditedPostText(post.content); }}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
      >
        <X size={16} />
      </button>
      <button
        onClick={() => updatePostMutation.mutate(editedPostText)}
        disabled={updatePostMutation.isPending}
       className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition cursor-pointer"
      >
        <Check size={16} />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 leading-relaxed mb-4 whitespace-pre-line wrap-break-word overflow-wrap-anywhere">
          {post.content}
        </p>
      )}

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
              onKeyDown={(e) => {
             if (e.key === "Enter") {
             e.preventDefault();
             handleAddComment();
             }
            }}
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