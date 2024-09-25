"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import ReportCard from "./ReportCard";
import { ApiClient } from "@asfilab/janun-client";
import { useRouter } from "next/navigation";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadReports = async () => {
    try {
      setLoading(true);
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.report.getReports();
      console.log(result);
      setReports(result.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   loadReports();
  // }, [router]);

  useEffect(() => {
    // Fetch reports data here
    // For now, we'll use mock data
    const mockData = {
      data: [
        {
          id: 1,
          reason: "Inappropriate content",
          status: "pending",
          user: { username: "user1", premium: true },
          post: {
            title: "jnu under attack",
            premium: true,
            reported: true,
            reacted: true,
            commented: true,
          },
        },
        {
          id: 2,
          reason: "Spam",
          status: "resolved",
          user: { username: "user2", premium: false },
          comment: {
            postSlug: "hall-off-jnu-notice-eitb",
          },
        },
        {
          id: 3,
          reason: "Harassment",
          status: "pending",
          user: { username: "user3", premium: false },
          thread: { name: "notice" },
        },
      ],
    };
    setReports(mockData.data);
  }, []);

  return (
    <Card>
      <CardHeader title="My Reports List" />
      <CardContent>
        {reports.length > 0 ? (
          <ReportCard reports={reports} />
        ) : (
          <Typography variant="body1" color="textSecondary">
            No reports found.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Reports;
