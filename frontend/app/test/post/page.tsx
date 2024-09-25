"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiClient, Post, PostsPage } from "@asfilab/janun-client";
import { Pacifico } from "next/font/google";
import PostCard from "./PostCard"; // Assume you have a PostCard component

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export default function PostsWebPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const loadPosts = async (currentPage: number) => {
    try {
      setLoading(true);
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.post.getPosts({
        page: currentPage,
        size: 2,
      });
      if (result.data && result.data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...(result.data || [])]);
        setTotalPosts(result.totalElements || 0);
        setTotalPages(result.totalPages || 0);
      }
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryPage = Number(searchParams.get("page")) || 1;
    setPage(queryPage);
  }, [searchParams]);

  useEffect(() => {
    if (page > 0) {
      router.push(`?page=${page}`, { scroll: true });
    }
    loadPosts(page);
  }, [page, router]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY + window.innerHeight;
      if (scrollTop >= scrollableHeight - 50 && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* <h1
        className={`text-4xl font-bold text-red-500 mb-8 ${pacifico.className}`}
      >
        Janun!
      </h1>
      <a href="/test" className=" text-red-500 font-bold mb-8">
        ← Back to Home
      </a>
      <div className="mb-2 flex items-center space-x-4 text-red-500">
        <div className="bg-gray-200 p-2 rounded-md">
          <p className="font-bold text-sm">{totalPosts} Total Posts</p>
        </div>
        <div className="bg-gray-200 p-2 rounded-md">
          <p className="font-bold text-sm">Page {page} / {totalPages}</p>
        </div>
      </div> */}

      <div className="w-full max-w-3xl text-black">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {loading && <p>Loading...</p>}
        {!hasMore && !loading && <p>No more posts to load.</p>}
      </div>
      <div className="mt-4">
        <p>Total Posts: {totalPosts}</p>
        {/* <p>
          Page: {page} of {totalPages}
        </p> */}
      </div>
    </div>
  );
}
