package com.quantumguys.janun.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.dto.PostDTO;
import com.quantumguys.janun.dto.ThreadCreateDTO;
import com.quantumguys.janun.dto.ThreadDTO;
import com.quantumguys.janun.entity.AuthUser;
import com.quantumguys.janun.entity.Channel;
import com.quantumguys.janun.entity.Thread;
import com.quantumguys.janun.repository.AuthUserRepository;
import com.quantumguys.janun.repository.ChannelRepository;
import com.quantumguys.janun.repository.PostRepository;
import com.quantumguys.janun.repository.ThreadRepository;

@Service
@Transactional
public class ThreadService {

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private ChannelRepository channelRepository;

    @Autowired
    private AuthUserRepository userRepository;

    @Autowired
    private PostRepository postRepository;
    

    public ThreadDTO createThread(String channelSlug,ThreadCreateDTO threadCreateDTO) {
        if(threadRepository.existsBySlugAndChannelSlug(threadCreateDTO.getSlug(), channelSlug)) {
            throw new RuntimeException("Thread already exists with this slug");
        }
        Channel channel = channelRepository.findBySlug(channelSlug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));

        Thread thread = new Thread();
        thread.updateFromDto(threadCreateDTO);
        thread.setChannel(channel);

        thread = threadRepository.save(thread);
        return thread.toDto(ThreadDTO.class);
    }

    public ThreadDTO updateThread(String channelSlug,String slug, ThreadCreateDTO threadCreateDTO) {
        Thread thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                            .orElseThrow(() -> new RuntimeException("Thread not found"));

        thread.updateFromDto(threadCreateDTO);
        thread = threadRepository.save(thread);
        return thread.toDto(ThreadDTO.class);
    }

    public ThreadDTO getThread(String channelSlug, String slug) {
        Thread thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                            .orElseThrow(() -> new RuntimeException("Thread not found"));

        return thread.toDto(ThreadDTO.class);
    }

    public PageDTO<ThreadDTO> getThreads(String channelSlug, Pageable pageable) {
        Page<ThreadDTO> threads = threadRepository.findAllByChannelSlug(channelSlug, pageable)
                            .map(thread -> thread.toDto(ThreadDTO.class));
        return new PageDTO<>(threads);
    }

    public void deleteThread(String channelSlug, String slug) {
        Thread thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                            .orElseThrow(() -> new RuntimeException("Thread not found"));
        threadRepository.delete(thread);
    }

    public void hideThread(String channelSlug, String slug) {
        Thread thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                            .orElseThrow(() -> new RuntimeException("Thread not found"));
        thread.setHidden(true);
        threadRepository.save(thread);
    }
    
    public ThreadDTO subscribeThread(String username, String channelSlug, String slug) {
        Thread thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                            .orElseThrow(() -> new RuntimeException("Thread not found"));

        AuthUser user = userRepository.findByUsername(username)
                            .orElseThrow(() -> new RuntimeException("User not found"));

        user.subscribe(thread);
        userRepository.save(user);

        thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                            .orElseThrow(() -> new RuntimeException("Thread not found"));

        return thread.toDto(ThreadDTO.class);
    }

    public ThreadDTO unsubscribeThread(String username, String channelSlug, String slug) {
        Thread thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                            .orElseThrow(() -> new RuntimeException("Thread not found"));

        AuthUser user = userRepository.findByUsername(username)
                            .orElseThrow(() -> new RuntimeException("User not found"));

        user.unsubscribe(thread);
        userRepository.save(user);

        thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                            .orElseThrow(() -> new RuntimeException("Thread not found"));

        return thread.toDto(ThreadDTO.class);
    }

    public PageDTO<PostDTO> getPosts(String username, String channelSlug, String slug, Pageable pageable) {
        boolean isPremium = false;
        if(username != null)isPremium = userRepository.existsByUsernameAndPremium(username, true);
        Page<PostDTO> posts = postRepository.findByChannelSlugAndThreadSlug(channelSlug, slug, isPremium, pageable)
                            .map(post -> post.toDto(PostDTO.class));
        return new PageDTO<>(posts);
    }

}