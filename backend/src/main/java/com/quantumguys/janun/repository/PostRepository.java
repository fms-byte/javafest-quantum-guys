package com.quantumguys.janun.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.quantumguys.janun.entity.*;

public interface PostRepository extends JpaRepository<Post, Long> {

    Optional<Post> findById(long id);
    Optional<Post> findBySlug(String slug);
    boolean existsBySlug(String slug);
    Page<Post> findAllByThreadSubscribersUsername(String username, Pageable pageable);

    // find posts by channel slug and thread slug, non hidden posts and check is-premium.
    //  if premium is true, return all posts, else return only non-premium posts. use pagination
    @Query("SELECT p FROM Post p JOIN p.thread t JOIN t.channel c " +
           "WHERE c.slug = :channelSlug AND t.slug = :threadSlug AND p.hidden = false AND p.status = 'published' " +
           "AND (t.premium = false OR t.premium = :isPremium)")
    Page<Post> findByChannelSlugAndThreadSlug(@Param("channelSlug") String channelSlug,
                                              @Param("threadSlug") String threadSlug,
                                              @Param("isPremium") boolean isPremium,
                                              Pageable pageable);
    
    // find posts by channel slug, non hidden posts and check is-premium.
    //  if premium is true, return all posts, else return only non-premium posts. use pagination
    @Query("SELECT p FROM Post p JOIN p.thread t JOIN t.channel c " +
           "WHERE c.slug = :channelSlug AND p.hidden = false AND p.status = 'published' " +
           "AND (t.premium = false OR t.premium = :isPremium)")
    Page<Post> findByChannelSlug(@Param("channelSlug") String channelSlug,
                                 @Param("isPremium") boolean isPremium,
                                 Pageable pageable);


       // find posts by tag slug, non hidden posts and check is-premium.
       //  if premium is true, return all posts, else return only non-premium posts. use pagination
       @Query("SELECT p FROM Post p JOIN p.thread t JOIN t.channel c JOIN p.tags tag " +
              "WHERE tag.name = :tagName AND p.hidden = false AND p.status = 'published' " +
              "AND (t.premium = false OR t.premium = :isPremium)")
       Page<Post> findByTagName(@Param("tagName") String tagName,
                                @Param("isPremium") boolean isPremium,
                                Pageable pageable);

       // Page<Post> findByTagsSlug(String tagSlug, Pageable pageable);

       
       // get latest posts, non hidden posts and check is-premium.
       //  if premium is true, return all posts, else return only non-premium posts. use pagination
       @Query("SELECT p FROM Post p JOIN p.thread t JOIN t.channel c " +
              "WHERE p.hidden = false AND p.status = 'published' " +
              "AND (t.premium = false OR t.premium = :isPremium)")
       Page<Post> findLatest(@Param("isPremium") boolean isPremium, Pageable pageable);



    default Page<Post> getChannelPosts(String channelSlug, boolean isPremium, Pageable pageable) {
       return findByChannelSlug(channelSlug, isPremium, pageable);
    }

    default Page<Post> getThreadPosts(String channelSlug, String threadSlug, boolean isPremium, Pageable pageable) {
       return findByChannelSlugAndThreadSlug(channelSlug, threadSlug, isPremium, pageable);
    } 

    default Page<Post> getTagPosts(String tagName, boolean isPremium, Pageable pageable) {
       return findByTagName(tagName, isPremium, pageable);
    }

    default Page<Post> getPosts(boolean isPremium, Pageable pageable) {
          return findLatest(isPremium, pageable);
    }

    default Page<Post> findMyPosts(String username, Pageable pageable) {
       return findAllByThreadSubscribersUsername(username, pageable);
 }

    default Optional<Post> getPostEntity(String postSlug) {
        return findBySlug(postSlug);
    }
    
    
}