package com.quantumguys.janun.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.quantumguys.janun.entity.Thread;

public interface ThreadRepository extends JpaRepository<Thread, Long> {

    Optional<Thread> findBySlugAndChannelSlug(String slug, String channelSlug);
    boolean existsBySlugAndChannelSlug(String slug, String channelSlug);
    Page<Thread> findAllBySubscribersUsername(String username, Pageable pageable);

    Page<Thread> findAllByChannelSlug(String channelSlug, Pageable pageable);

    boolean existsBySlugAndChannelSlugAndSubscribersUsername(String slug, String channelSlug, String username);

    default boolean isSubscribed(String username, String channelSlug, String slug) {
        if(username == null || channelSlug==null || slug==null) {
            return false;
        }
        return existsBySlugAndChannelSlugAndSubscribersUsername(slug, channelSlug, username);
    }

    default Optional<Thread> getThreadEntity(String channelSlug, String threadSlug) {
        return findBySlugAndChannelSlug(threadSlug, channelSlug);
    }

    default Page<Thread> findMyThreads(String username, Pageable pageable){
        return findAllBySubscribersUsername(username, pageable);
    }
}