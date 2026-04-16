////////////////////////// COMMUNITY PAGE ///////////////////////////////

import Header from "../components/Header";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/postsApi";

export default function CommunityPage() {

  // ================= FETCH POSTS =================
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // ================= LOADING =================
  if (isLoading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  // ================= ERROR =================
  if (error) {
    return <p className="text-center mt-20">Error loading posts</p>;
  }


  //================== MAIN RENDER =================
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* TITLE */}
      <div className="mt-28 flex flex-col items-center gap-2 text-center px-4">
        <h1 className="text-4xl font-bold" style={{ color: "#2F327D" }}>
          Community
        </h1>
        <p className="text-gray-600 max-w-xl">
          Share your thoughts, ask questions, and connect with other learners.
        </p>
      </div>

      {/* CREATE POST */}
      <div className="flex flex-col items-center gap-6 p-6">
        <CreatePost />
      </div>

      {/* POSTS LIST */}
      <div className="flex flex-col items-center gap-6 p-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}