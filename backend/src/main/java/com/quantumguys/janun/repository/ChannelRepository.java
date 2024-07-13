package com.quantumguys.janun.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.quantumguys.janun.entity.AuthUser;
import com.quantumguys.janun.entity.Channel;

public interface ChannelRepository extends JpaRepository<Channel, Long> {

    Optional<Channel> findBySlug(String slug);
    Boolean existsBySlug(String slug);

    // Check if the user is subscribed to all threads in the channel
    @Query("SELECT CASE WHEN COUNT(t) = c.threadCount THEN TRUE ELSE FALSE END " +
           "FROM AuthUser u JOIN u.subscribedThreads t JOIN t.channel c " +
           "WHERE u = :user AND c = :channel")
    boolean isUserSubscribedToAllThreads(@Param("user") AuthUser user, @Param("channel") Channel channel);


    // Check if the user is subscribed to any thread in the channel
    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN TRUE ELSE FALSE END " +
           "FROM AuthUser u JOIN u.subscribedThreads t JOIN t.channel c " +
           "WHERE u = :user AND c = :channel")
    boolean isUserSubscribedToAnyThread(@Param("user") AuthUser user, @Param("channel") Channel channel);
}