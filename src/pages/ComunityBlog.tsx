////////////////////////// COMMUNITY PAGE //////////////////////////

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

////////////////////////// TYPES //////////////////////////

// Comment type
type Comment = {
  id: string;
  comment: string;
  createdAt: string;
};

// Post type (matching backend)
type Post = {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  User?: {
    name: string;
  };
};

////////////////////////// COMPONENT //////////////////////////

export default function CommunityPage() {

  ////////////////////////// STATE //////////////////////////
  const [posts, setPosts] = useState<Post[]>([]);

  ////////////////////////// FETCH POSTS //////////////////////////
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts/:post_id");
        setPosts(res.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  ////////////////////////// ADD POST //////////////////////////
  const addPost = async (text: string) => {
    try {
      const res = await axios.post("http://localhost:3000/posts/:post_id", {
        title: "New Post",
        content: text,
      });

      setPosts([res.data.data, ...posts]);

    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  ////////////////////////// RETURN //////////////////////////
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* TITLE */}
      <div className="mt-28 flex flex-col items-center gap-2 text-center px-4">
        <h1 className="text-4xl font-bold text-purple-900">Community</h1>
        <p className="text-gray-600 max-w-xl">
          Share your thoughts, ask questions, and connect with other learners.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center gap-6 p-6">

        {/* CREATE POST */}
        <CreatePost addPost={addPost} />

        {/* POSTS LIST */}
        {posts.map((post) => (
          <PostCard
            key={post.id}
             postId={post.id}
            content={post.content}
            createdAt={post.createdAt}
            userName={post.User?.name}
            likes={post.likes}
            
          />
        ))}

      </div>
    </>
  );
}