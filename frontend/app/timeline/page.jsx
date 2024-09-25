"use client";

import Post from "@/app/components/Post";
import Layout from "@/app/components/Layout";
import PostCard from "@/app/post/PostCard";
import PostsWebPage from "../post/page";
import { useEffect, useState } from "react";
import checkLogin from "../components/checkLogin";
import { useRouter } from "next/navigation";
import { ApiClient } from "@asfilab/janun-client";

export default function timeline() {
  /////to be moved in layout////
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  async function dataFetch() {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      console.log(apiClient);
      const res = await apiClient.post.getPosts();
      console.log(res);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
      console.log("Error fetching posts");
    }
  }

  useEffect(() => {
    checkLogin().then(
      (resp) => {
        console.log(resp);
        if (!resp) router.push("/login");
      },
      () => alert("Failed to connect to sever")
    );
  }, []);

  useEffect(() => {
    dataFetch();
  }, []);

  async function handleLike(postSlug, reacted) {
    const apiUrl = "http://localhost:5000";
    const token = localStorage.getItem("token") || "";
    const apiClient = new ApiClient(apiUrl, token);
    // console.log(apiClient);
    await apiClient.post.reactToPost({
      slug: postSlug,
      type: reacted ? null : "like",
    });
    const tarPost = await apiClient.post.getPost({ slug: postSlug });
    setPosts((posts) =>
      posts.map((el) => (el.slug == postSlug ? tarPost : el))
    );
  }

  async function handleDisLike(postSlug, reacted) {
    const apiUrl = "http://localhost:5000";
    const token = localStorage.getItem("token") || "";
    const apiClient = new ApiClient(apiUrl, token);
    // console.log(apiClient);
    await apiClient.post.reactToPost({
      slug: postSlug,
      type: reacted ? null : "dislike",
    });
    const tarPost = await apiClient.post.getPost({ slug: postSlug });
    setPosts((posts) =>
      posts.map((el) => (el.slug == postSlug ? tarPost : el))
    );
  }

  return (
    <Layout>
      <div className="w-screen items-center  ml-48 mr-16">
        {posts.map((el) => (
          <Post key={el.slug} Liker={handleLike} Disliker={handleDisLike}>
            {el}
          </Post>
        ))}
      </div>
    </Layout>
  );
}
