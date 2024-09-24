"use client";
import { ApiClient, Tag } from "@asfilab/janun-client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { useRouter } from "next/navigation";

import ForumIcon from "@mui/icons-material/Forum";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";

const TagCard = ({ tag }: { tag: Tag }) => {
  const router = useRouter();

  const handleTagClick = () => {
    router.push(`/tags/${tag.name}`);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        marginBottom: 3,
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          transform: "translateY(-5px)",
          cursor: "pointer",
        },
      }}
      onClick={handleTagClick}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 3,
          flexDirection: "column",
        }}
      >
        {/* Tag Title Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            paddingBottom: 2,
          }}
        >
          <Chip
            label={tag.name}
            color="primary"
            variant="filled"
            sx={{
              borderRadius: 3,
              fontSize: "1.1rem",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          />
        </Box>

        {/* Stats Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Chip
            icon={<PeopleIcon />}
            label={`${tag.channelCount} Channels`}
            color="secondary"
            variant="outlined"
            size="medium"
            sx={{
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          />
          <Chip
            icon={<ArticleIcon />}
            label={`${tag.postCount} Posts`}
            color="secondary"
            variant="outlined"
            size="medium"
            sx={{
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          />
          <Chip
            icon={<ForumIcon />}
            label={`${tag.threadCount} Threads`}
            color="secondary"
            variant="outlined"
            size="medium"
            sx={{
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TagCard;
