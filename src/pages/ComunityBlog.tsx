import { useState, useEffect } from "react";
import Header from '../components/Header'; 
import Papa from "papaparse"; // ✅ ADDED: for CSV parsing
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

// Post type stays the same
type Post = {
  id: string;
  title: string;
  content: string;
  likes: number;
  createdAt: string;
  User?: { name: string };
};

// ✅ ADDED: CSV row type for TypeScript
type CsvRow = {
  id: string;
  title: string;
  content: string;
  likes: string; // CSV values are strings
  createdAt: string;
  userName: string;
};

function CommunityBlog() {
  const [posts, setPosts] = useState<Post[]>([]);

  // ✅ CHANGED: fetchPosts now uses CSV instead of backend
  const fetchPosts = async () => {
    try {
      const res = await fetch("/posts.csv"); // ✅ CSV fetch
      const csvText = await res.text();

      const parsed = Papa.parse(csvText, { header: true }); // ✅ parse CSV

      const formattedPosts: Post[] = (parsed.data as CsvRow[])
        .filter((row) => row.id) // ✅ skip empty rows
        .map((row) => ({
          id: row.id,
          title: row.title,
          content: row.content,
          likes: Number(row.likes),
          createdAt: row.createdAt,
          User: { name: row.userName },
        }));

      setPosts(formattedPosts);
    } catch (err) {
      console.log("Error reading CSV:", err);
    }
  };

  // ✅ CHANGED: wrap fetchPosts in async function to avoid React warning
  useEffect(() => {
    const load = async () => {
      await fetchPosts();
    };
    load();
  }, []);

  // Add new post locally (same as your original code)
  const handleAddPost = (content: string) => {
    if (!content.trim()) return;

    const newPost: Post = {
      id: (posts.length + 1).toString(),
      title: "Untitled",
      content,
      likes: 0,
      createdAt: new Date().toISOString(),
      User: { name: "You" },
    };

    setPosts([newPost, ...posts]);
  };

  return (
    <>
       <Header />
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col items-center py-10">
      <h1 className="text-3xl font-semibold text-indigo-700">Community</h1>
      <p className="text-gray-500 mt-2 mb-8 text-center">
        Share Ideas, Ask Questions, And Support Fellow Learners
      </p>

      <div className="w-full max-w-2xl space-y-6">
        <CreatePost addPost={handleAddPost} />

        {posts.map((post) => (
          <PostCard
            key={post.id}
            content={post.content}
            title={post.title}
            createdAt={post.createdAt}
            userName={post.User?.name}
          />
        ))}
      </div>
    </div>
    </>
  );
}

export default CommunityBlog;