package com.quantumguys.janun.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.quantumguys.janun.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {

    Optional<Report> findByPostSlugAndUserUsername(String postSlug, String username);
    boolean existsByPostSlugAndUserUsername(String postSlug, String username);

    Optional<Report> findByCommentIdAndUserUsername(Long commentId, String username);
    boolean existsByCommentIdAndUserUsername(Long commentId, String username);

    Optional<Report> findByThreadSlugAndUserUsername(String threadSlug, String username);
    boolean existsByThreadSlugAndUserUsername(String threadSlug, String username);

    Page<Report> findAllByUserUsername(String username, Pageable pageable);

    default boolean isReportedPost(String username, String postSlug) {
        return existsByPostSlugAndUserUsername(postSlug, username);
    }

    default boolean isReportedComment(String username, Long commentId) {
        return existsByCommentIdAndUserUsername(commentId, username);
    }

    default boolean isReportedThread(String username, String threadSlug) {
        return existsByThreadSlugAndUserUsername(threadSlug, username);
    }

    default Page<Report> findMyReports(String username, Pageable pageable){
        return findAllByUserUsername(username, pageable);
    }

}