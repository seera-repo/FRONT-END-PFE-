////////////////////////// CREATE POST COMPONENT //////////////////////////

import { useState, useRef } from "react";
import { Send } from "lucide-react";

////////////////////////// TYPES //////////////////////////

type CreatePostProps = {
  addPost: (text: string) => Promise<void>; // ✅ FIX (async)
  userName?: string;
};

////////////////////////// COMPONENT //////////////////////////

export default function CreatePost({ addPost, userName = "You" }: CreatePostProps) {

  ////////////////////////// STATE //////////////////////////
  const [text, setText] = useState("");

  ////////////////////////// REF //////////////////////////
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  ////////////////////////// SEND POST //////////////////////////
  const handleSend = async () => {
    if (text.trim() === "") return;

    try {
      await addPost(text); // ✅ wait backend

      setText(""); // clear textarea

      // reset height
      if (textareaRef.current)
        textareaRef.current.style.height = "auto";

    } catch (error) {
      console.error("Error sending post:", error);
    }
  };

  ////////////////////////// RENDER //////////////////////////
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 border border-[#d2d4f5] w-full max-w-2xl">

      {/* AVATAR + TEXTAREA */}
      <div className="flex items-start gap-4">
        
        {/* AVATAR */}
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600">
          {userName.slice(0, 2).toUpperCase()}
        </div>

        {/* TEXTAREA */}
        <textarea
          ref={textareaRef}
          placeholder="Share Something With Community..."
          value={text}

          ////////////////////////// HANDLE CHANGE //////////////////////////
          onChange={(e) => {
            setText(e.target.value);

            const el = e.target;

            // reset height (important for shrink)
            el.style.height = "auto";

            // auto-grow
            el.style.height = el.scrollHeight + "px";
          }}

          ////////////////////////// ENTER KEY //////////////////////////
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}

          className="flex-1 bg-white rounded-2xl px-5 py-4 text-sm outline-none border border-[#d2d4f5] focus:border-[#2F35C2] focus:ring-1 focus:ring-[#2F35C2] transition placeholder-gray-400 overflow-hidden"
          rows={1}
        />
      </div>

      {/* SEND BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSend}
          className="px-5 py-2 rounded-full bg-purple-900 flex items-center justify-center hover:bg-purple-800 transition text-white"
        >
          <Send size={18} />
        </button>
      </div>

    </div>
  );
}