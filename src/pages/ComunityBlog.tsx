////////////////////////// COMMUNITY PAGE ///////////////////////////////



import { useState } from "react";
import Header from "../components/Header";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

// Type for comments
type Comment = {
  id: string;
  comment: string;
  createdAt: string;
  userName?: string;
};

// Type for posts
type Post = {
  id: string;
  content: string;
  createdAt: string;
  userName?: string;
  likes: number;
  comments: Comment[];
};

export default function CommunityPage() {
  ////////////////////////// INITIAL FAKE POSTS ///////////////////////////
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      content: "Hello Community! Excited to share my first post here.",
      createdAt: new Date().toISOString(),
      userName: "Sarah",
      likes: 0,
      comments: [
        {
          id: "c1",
          comment: "Welcome, Sarah! Great to have you here.",
          createdAt: new Date().toISOString(),
          userName: "Liam",
        },
        {
          id: "c2",
          comment: "Good luck learning React!",
          createdAt: new Date().toISOString(),
          userName: "Maria",
        },
      ],
    },
    {
      id: "2",
      content: "Does anyone know good resources for learning React?",
      createdAt: new Date().toISOString(),
      userName: "Alex",
      likes: 0,
      comments: [],
    },
  ]);

  ////////////////////////// FUNCTION TO ADD NEW POST ///////////////////////////
  const addPost = (text: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content: text,
      createdAt: new Date().toISOString(),
      userName: "You",
      likes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  ////////////////////////// RENDER ///////////////////////////
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* PAGE TITLE */}
      <div className="mt-28 flex flex-col items-center gap-2 text-center px-4">
        <h1 className="text-4xl font-bold text-purple-900">Community</h1>
        <p className="text-gray-600 max-w-xl">
          Share your thoughts, ask questions, and connect with other learners.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center gap-6 p-6">
        {/* CREATE POST INPUT */}
        <CreatePost addPost={addPost} />

        {/* LIST OF POSTS */}
        {posts.map((post) => (
          <PostCard
            key={post.id}
            content={post.content}
            createdAt={post.createdAt}
            userName={post.userName}
            likes={post.likes}
            initialComments={post.comments}
          />
        ))}
      </div>
    </>
  );
}