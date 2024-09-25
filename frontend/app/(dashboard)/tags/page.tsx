'use client';

import { Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import TagCard from './TagCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiClient, Tag } from '@asfilab/janun-client';

export default function Tags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);

  const loadTags = async () => {
    try {
      setLoading(true);
      const apiUrl = 'http://localhost:5000';
      const token = localStorage.getItem('token') || '';
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.tag.getTags();
      console.log(result);
      if (result.data && result.data.length === 0) {
        setHasMore(false);
      } else {
        setTags(result.data || []);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tags:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTags();
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY + window.innerHeight;
      if (!loading && hasMore && scrollTop >= scrollableHeight) {
        loadTags();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <Container sx={{ padding: 2 }}>
      <CardHeader title="Tags" />
      <Grid container spacing={2}>
        {tags.map((tag, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TagCard tag={tag} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}