package com.quantumguys.janun.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.quantumguys.janun.entity.AuthUser;
import com.quantumguys.janun.entity.Channel;

public interface ChannelRepository extends JpaRepository<Channel, Long> {

    Optional<Channel> findBySlug(String slug);
    Optional<Channel> findBySlugAndHiddenFalse(String slug);
    Boolean existsBySlug(String slug);
    Page<Channel> findAllByHiddenFalse(Pageable pageable);
    Page<Channel> findAllByThreadsSubscribersUsernameAndHiddenFalse(String username, Pageable pageable);

    // Check if the user is subscribed to all threads in the channel
    @Query("SELECT CASE WHEN COUNT(t) = c.threadCount THEN TRUE ELSE FALSE END " +
           "FROM AuthUser u JOIN u.subscribedThreads t JOIN t.channel c " +
           "WHERE u = :user AND c = :channel")
    boolean isUserSubscribedToAllThreads(@Param("user") AuthUser user, @Param("channel") Channel channel);

    @Query("SELECT CASE WHEN COUNT(t) = c.threadCount THEN TRUE ELSE FALSE END " +
           "FROM AuthUser u JOIN u.subscribedThreads t JOIN t.channel c " +
           "WHERE u.username = :username AND c.slug = :channelSlug")
    boolean isUserSubscribedToAllThreads(@Param("username") String username, @Param("channelSlug") String channelSlug);


    // Check if the user is subscribed to any thread in the channel
    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN TRUE ELSE FALSE END " +
           "FROM AuthUser u JOIN u.subscribedThreads t JOIN t.channel c " +
           "WHERE u = :user AND c = :channel")
    boolean isUserSubscribedToAnyThread(@Param("user") AuthUser user, @Param("channel") Channel channel);

   @Query("SELECT CASE WHEN COUNT(t) > 0 THEN TRUE ELSE FALSE END " +
          "FROM AuthUser u JOIN u.subscribedThreads t JOIN t.channel c " +
          "WHERE u.username = :username AND c.slug = :channelSlug")
    boolean isUserSubscribedToAnyThread(@Param("username") String username, @Param("channelSlug") String channelSlug);


    default boolean isSubscribed(String username, String channelSlug) {
        return isUserSubscribedToAnyThread(username, channelSlug);
    }

    default boolean isFullySubscribed(String username, String channelSlug) {
        return isUserSubscribedToAllThreads(username, channelSlug);
    }

    default Optional<Channel> findAllowedChannel(String slug){
       return findBySlugAndHiddenFalse(slug);
    }

    default Page<Channel> findAll(Pageable pageable) {
       return findAllByHiddenFalse(pageable);
    }

    default Page<Channel> findMyChannels(String username, Pageable pageable){
       return findAllByThreadsSubscribersUsernameAndHiddenFalse(username, pageable);
    }
}