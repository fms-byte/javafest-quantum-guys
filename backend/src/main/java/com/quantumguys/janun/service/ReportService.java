package com.quantumguys.janun.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.dto.PostMinDTO;
import com.quantumguys.janun.dto.ReportCreateRequestDTO;
import com.quantumguys.janun.dto.ReportDTO;
import com.quantumguys.janun.dto.ReportUpdateRequestDTO;
import com.quantumguys.janun.dto.ThreadMinDTO;
import com.quantumguys.janun.entity.AuthUser;
import com.quantumguys.janun.entity.Comment;
import com.quantumguys.janun.entity.Post;
import com.quantumguys.janun.entity.Report;
import com.quantumguys.janun.entity.Thread;
import com.quantumguys.janun.repository.AuthUserRepository;
import com.quantumguys.janun.repository.CommentRepository;
import com.quantumguys.janun.repository.PostRepository;
import com.quantumguys.janun.repository.ReactionRepository;
import com.quantumguys.janun.repository.ReportRepository;
import com.quantumguys.janun.repository.ThreadRepository;

@Service
@Transactional
public class ReportService {

        @Autowired
        private ReportRepository reportRepository;

        @Autowired
        private AuthUserRepository authUserRepository;

        @Autowired
        private PostRepository postRepository;

        @Autowired
        private CommentRepository commentRepository;

        @Autowired
        private ThreadRepository threadRepository;

        @Autowired
        private ReactionRepository reactionRepository;

        public ReportDTO reportPost(String username, ReportCreateRequestDTO reportCreateDTO) {
                AuthUser user = authUserRepository.getUser(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                Post post = postRepository.getPostEntity(reportCreateDTO.getPostSlug())
                                .orElseThrow(() -> new RuntimeException("Post not found"));

                Report report = new Report();
                report.setReason(reportCreateDTO.getReason());
                report.setUser(user);
                report.setPost(post);

                Report savedReport = reportRepository.save(report);
                return convertToDto(username, savedReport);
        }

        public ReportDTO reportComment(String username, ReportCreateRequestDTO reportCreateDTO) {
                AuthUser user = authUserRepository.getUser(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                Comment comment = commentRepository.getCommentEntity(reportCreateDTO.getCommentId())
                                .orElseThrow(() -> new RuntimeException("Comment not found"));

                Report report = new Report();
                report.setReason(reportCreateDTO.getReason());
                report.setUser(user);
                report.setComment(comment);

                Report savedReport = reportRepository.save(report);
                return convertToDto(username, savedReport);
        }

        public ReportDTO reportThread(String username, ReportCreateRequestDTO reportCreateDTO) {
                AuthUser user = authUserRepository.getUser(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                Thread thread = threadRepository
                                .getThreadEntity(reportCreateDTO.getChannelSlug(), reportCreateDTO.getThreadSlug())
                                .orElseThrow(() -> new RuntimeException("Thread not found"));

                Report report = new Report();
                report.setReason(reportCreateDTO.getReason());
                report.setUser(user);
                report.setThread(thread);

                Report savedReport = reportRepository.save(report);
                return convertToDto(username, savedReport);
        }

        public ReportDTO report(String username, ReportCreateRequestDTO reportCreateDTO) {
                if (reportCreateDTO.getType().equals("post")) {
                        return reportPost(username, reportCreateDTO);
                } else if (reportCreateDTO.getType().equals("comment")) {
                        return reportComment(username, reportCreateDTO);
                } else
                        return reportThread(username, reportCreateDTO);
        }

        public ReportDTO updateReport(long reportId, ReportUpdateRequestDTO reportUpdateDTO) {
                Report report = reportRepository.findById(reportId)
                                .orElseThrow(() -> new RuntimeException("Report not found"));

                report.setStatus(reportUpdateDTO.getStatus());
                Report savedReport = reportRepository.save(report);
                return convertToDto(report.getUser().getUsername(), savedReport);
        }

        public ReportDTO getReport(long reportId) {
                Report report = reportRepository.findById(reportId)
                                .orElseThrow(() -> new RuntimeException("Report not found"));
                return convertToDto(report.getUser().getUsername(), report);
        }

        public PageDTO<ReportDTO> getReports(Pageable pageable) {
                return new PageDTO<ReportDTO>(reportRepository.findAll(pageable)
                                .map(report -> convertToDto(report.getUser().getUsername(), report)));
        }

        public PageDTO<ReportDTO> getMyReports(String username, Pageable pageable) {
                return new PageDTO<ReportDTO>(reportRepository.findMyReports(username,pageable)
                                .map(report -> convertToDto(report.getUser().getUsername(), report)));
        }

        public void deleteReport(long reportId) {
                reportRepository.deleteById(reportId);
        }

        private ReportDTO convertToDto(String username, Report report) {
                ReportDTO reportDTO = report.toDto(ReportDTO.class);
                if (report.getPost() != null) {
                        Post post = report.getPost();
                        PostMinDTO postDTO = post.toDto(PostMinDTO.class);
                        postDTO.setReaction(reactionRepository.getReactionType(username, post.getSlug()));
                        postDTO.setReacted(postDTO.getReaction() != null);
                        postDTO.setCommented(commentRepository.isCommented(username, post.getSlug()));
                        postDTO.setReported(reportRepository.isReportedPost(username, post.getSlug()));
                        postDTO.setSubscribed(threadRepository.isSubscribed(username, post.getThread().getChannel().getSlug(), post.getThread().getSlug()));

                        reportDTO.setPost(postDTO);
                }
                if (report.getThread() != null) {
                        Thread thread = report.getThread();
                        boolean isSubscribed = threadRepository.isSubscribed(username, thread.getChannel().getSlug(),
                                        thread.getSlug());
                        ThreadMinDTO threadDTO = thread.toDto(isSubscribed, ThreadMinDTO.class);
                        reportDTO.setThread(threadDTO);
                }

                return reportDTO;
        }

}