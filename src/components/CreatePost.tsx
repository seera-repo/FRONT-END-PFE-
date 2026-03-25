import { useState } from "react";
import type { KeyboardEvent } from "react";

type CreatePostProps = {
  addPost: (text: string) => void;
};

function CreatePost({ addPost }: CreatePostProps) {
  const [text, setText] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text.trim() !== "") {
      addPost(text);
      setText("");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 border border-gray-200">
      <input
        type="text"
        placeholder="Share Something With Community..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-gray-100 rounded-lg px-4 py-2 outline-none text-sm text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}

export default CreatePost;
