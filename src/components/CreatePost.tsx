import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createPost, type CreatePostInput } from "../api/postsApi";
import { fetchMe } from "../api/userAPI";
import Avatar from "../components/avatar";




//=============================== CREATE POST COMPONENT =================================
export default function CreatePost() {

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  //  GET CURRENT USER
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  // CREATE POST
  const mutation = useMutation({
    mutationFn: (data: CreatePostInput) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSend = () => {
    if (!text.trim()) return;

    mutation.mutate({
       title: title.trim() || "Post",
      content: text,
    });

    setText("");
    setTitle("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };
//======================================= RENDER ==================================
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 border border-[#d2d4f5] w-full max-w-2xl">

      <div className="flex items-start gap-4">

        {/*  AVATAR */}
       <Avatar user={user} currentUserId={user?.id} />


       {/* TEXTAREA COLUMN */}
     <div className="flex flex-col gap-2 flex-1">

        {/* TITLE INPUT */}
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white rounded-2xl px-5 py-3 text-sm font-semibold outline-none border border-gray-200 focus:border-[#4C4FC1] focus:ring-1 focus:ring-[#4C4FC1]/20 transition placeholder-gray-400"
        />

        {/* TEXTAREA */}
        <textarea
          ref={textareaRef}
          placeholder="Share Something With Community..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            const el = e.target;
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        className=" bg-white rounded-2xl px-5 py-4 text-sm outline-none border  border-gray-200 focus:border-[#4C4FC1] focus:ring-1 focus:ring-[#4C4FC1]/20 transition placeholder-gray-400 overflow-hidden"
          rows={1}
        />
      </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSend}
          disabled={mutation.isPending}
          className="px-5 py-2 rounded-full flex items-center justify-center transition disabled:opacity-50 cursor-pointer"style={{ backgroundColor: "rgba(112, 45, 255, 0.2)", color: "#2F327D" }}      >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}