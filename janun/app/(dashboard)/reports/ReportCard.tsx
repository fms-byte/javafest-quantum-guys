"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
} from "@mui/material";

import { Flag, ThumbsUp, MessageCircleIcon, Minus } from "lucide-react";
import { Report } from "@asfilab/janun-client";

const ReportRow = ({ report }: {report: Report}) => (
  <TableRow>
    <TableCell>{report.id}</TableCell>
    <TableCell>{report.reason}</TableCell>
    <TableCell>
      <Chip
        label={report.status}
        color={report.status === "resolved" ? "primary" : "secondary"}
      />
    </TableCell>
    <TableCell>
      {report.post ? (
        <span>
          {report.post.title}
          {report.post.premium && (
            <Chip
              size="small"
              label="Premium"
              color="primary"
              style={{ marginLeft: 8 }}
            />
          )}
        </span>
      ) : report.comment ? (
        <span>Comment on: {report.comment.postSlug}</span>
      ) : (
        <span>Thread: {report.thread.name}</span>
      )}
    </TableCell>
    <TableCell>
      {!report.post?.reported &&
      !report.post?.reacted &&
      !report.post?.commented ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Minus size={16} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 1 }}>
          {report.post?.reported && <Flag size={16} />}
          {report.post?.reacted && <ThumbsUp size={16} />}
          {report.post?.commented && <MessageCircleIcon size={16} />}
        </Box>
      )}
    </TableCell>
  </TableRow>
);

const ReportCard = ({ reports }: { reports: Report[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <ReportRow key={report.id} report={report} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportCard;
