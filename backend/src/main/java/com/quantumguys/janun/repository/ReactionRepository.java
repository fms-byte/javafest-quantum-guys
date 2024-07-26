package com.quantumguys.janun.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.quantumguys.janun.entity.Reaction;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    Optional<Reaction> findByPostSlugAndUserUsername(String postSlug, String username);
    boolean existsByPostSlugAndUserUsername(String postSlug, String username);
    Page<Reaction> findAllByUserUsername(String username, Pageable pageable);

    default boolean isReacted(String username, String postSlug) {
        return existsByPostSlugAndUserUsername(postSlug, username);
    }

    default String getReactionType(String username, String postSlug) {
        return findByPostSlugAndUserUsername(postSlug, username).map(Reaction::getType).orElse(null);
    }

    default Optional<Reaction> getReaction(String username, String postSlug) {
        return findByPostSlugAndUserUsername(postSlug, username);
    }

    default Page<Reaction> findMyReaction(String username, Pageable pageable){
        return findAllByUserUsername(username, pageable);
    }

}