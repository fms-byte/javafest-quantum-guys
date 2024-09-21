// app/dashboard/feed/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ApiClient, Post } from '@asfilab/janun-client';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import PostCard from './PostCard'; // Assume you have a PostCard component

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
      const apiUrl = 'http://localhost:5000';
      const token = localStorage.getItem('token') || '';
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
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryPage = Number(searchParams.get('page')) || 1;
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
      if (scrollTop >= scrollableHeight - 100 && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <Container sx={{ mt: 4, overflow: 'hidden', scrollbarWidth: 'none' }}>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {posts.length === 0 && !loading && <Typography>No posts found</Typography>}
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {loading && <CircularProgress />}
      </Box>
    </Container>
  );
}
