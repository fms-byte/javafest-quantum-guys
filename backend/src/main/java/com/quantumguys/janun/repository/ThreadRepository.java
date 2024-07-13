package com.quantumguys.janun.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.quantumguys.janun.entity.Thread;

public interface ThreadRepository extends JpaRepository<Thread, Long> {

    Optional<Thread> findBySlugAndChannelSlug(String slug, String channelSlug);
    boolean existsBySlugAndChannelSlug(String slug, String channelSlug);

    Page<Thread> findAllByChannelSlug(String channelSlug, Pageable pageable);
}