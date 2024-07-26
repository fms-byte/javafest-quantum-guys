package com.quantumguys.janun.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.quantumguys.janun.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findById(long id);

    Page<Comment> findByPostSlugAndUserUsername(String postSlug, String username, Pageable pageable);

    Page<Comment> findByPostSlug(String postSlug, Pageable pageable);

    Page<Comment> findByUserUsername(String username, Pageable pageable);

    Page<Comment> findByUserUsernameAndPostSlug(String username, String postSlug, Pageable pageable);

    boolean existsByPostSlugAndUserUsername(String postSlug, String username);

    default boolean isCommented(String username, String postSlug) {
        return existsByPostSlugAndUserUsername(postSlug, username);
    }

    default Page<Comment> getUserComments(String username, String postSlug, Pageable pageable) {
        return findByPostSlugAndUserUsername(postSlug, username, pageable);
    }

    default Page<Comment> getUserComments(String username, Pageable pageable) {
        return findByUserUsername(username, pageable);
    }

    default Page<Comment> getPostComments(String postSlug, Pageable pageable) {
        return findByPostSlug(postSlug, pageable);
    }

    default Optional<Comment> getComment(long commentId) {
        return findById(commentId);
    }

    default Optional<Comment> getCommentEntity(long commentId) {
        return getComment(commentId);
    }

    default Comment getMyLastCommentInPost(String username, String postSlug) {
        Pageable pageable = PageRequest.of(0, 1, Sort.Direction.fromString("desc"), "createdAt");
        Page<Comment> comments = findByUserUsernameAndPostSlug(username, postSlug, pageable);
        if(comments.getContent().size()>0){
            return comments.getContent().get(0);
        }
        else return null;
    }

}