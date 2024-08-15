package com.quantumguys.janun.service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.dto.TagMinDTO;
import com.quantumguys.janun.dto.ThreadCreateRequestDTO;
import com.quantumguys.janun.dto.ThreadDTO;
import com.quantumguys.janun.entity.AuthUser;
import com.quantumguys.janun.entity.Channel;
import com.quantumguys.janun.entity.Tag;
import com.quantumguys.janun.entity.Thread;
import com.quantumguys.janun.repository.AuthUserRepository;
import com.quantumguys.janun.repository.ChannelRepository;
import com.quantumguys.janun.repository.TagRepository;
import com.quantumguys.janun.repository.ThreadRepository;

@Service
@Transactional
public class ThreadService {

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private ChannelRepository channelRepository;

    @Autowired
    private AuthUserRepository authUserRepository;

    @Autowired
    private TagRepository tagRepository;

    public ThreadDTO createThread(String username, String channelSlug, ThreadCreateRequestDTO threadCreateDTO) {
        if (threadRepository.existsBySlugAndChannelSlug(threadCreateDTO.getSlug(), channelSlug)) {
            throw new RuntimeException("Thread already exists with this slug");
        }
        Channel channel = channelRepository.findBySlug(channelSlug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        Thread thread = new Thread();
        thread.setChannel(channel);
        thread.updateFromDto(threadCreateDTO);

        if (threadCreateDTO.getTags() != null) {
            // get real tags from db
            Set<String> tagNames = threadCreateDTO.getTags().stream().map(TagMinDTO::getName)
                    .collect(Collectors.toSet());
            Set<Tag> oldTags = tagRepository.getTags(tagNames);

            // add the channel in the tags and increase the channel count of the tags
            for (Tag tag : oldTags) {
                tag.getThreads().add(thread);
                tag.setThreadCount(tag.getThreadCount() + 1);
            }
            // set the tags of the channel and update the tag count
            thread.setTags(oldTags);
            thread.setTagCount(oldTags.size());
        }

        // save the channel. it will also save the tags
        channel.getThreads().add(thread);
        channel.setThreadCount(channel.getThreadCount() + 1);
        channel = channelRepository.save(channel);
        return convertToDto(username, thread);
    }

    public ThreadDTO updateThread(String username, String channelSlug, String slug, ThreadCreateRequestDTO threadCreateDTO) {
        Thread thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        // remove the old tags
        thread = removeAllTags(thread);
        // add new tags
        if (threadCreateDTO.getTags() != null) {
            // get real tags from db
            Set<String> tagNames = threadCreateDTO.getTags().stream().map(TagMinDTO::getName)
                    .collect(Collectors.toSet());
            Set<Tag> oldTags = tagRepository.getTags(tagNames);

            thread = setTags(thread, oldTags);
        }

        // update the channel
        threadCreateDTO.setTags(null);
        thread.updateFromDto(threadCreateDTO);
        thread = threadRepository.save(thread);

        return convertToDto(username, thread);
    }

    private ThreadDTO convertToDto(String username, Thread thread) {
        boolean isSubscribed = threadRepository.isSubscribed(username, thread.getChannel().getSlug(), thread.getSlug());
        boolean isChannelSubscribed = channelRepository.isSubscribed(username, thread.getChannel().getSlug());
        ThreadDTO threadDTO = thread.toDto(isSubscribed, ThreadDTO.class);
        threadDTO.getChannel().setSubscribed(isChannelSubscribed);
        return threadDTO;
    }

    public ThreadDTO getThread(String username, String channelSlug, String slug) {
        Thread thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        return convertToDto(username, thread);
    }

    private Thread removeAllTags(Thread thread) {
        if (thread.getTags() != null) {
            for (Tag tag : thread.getTags()) {
                tag.getThreads().remove(thread);
                tag.setThreadCount(tag.getThreadCount() - 1);
            }
        }
        thread.getTags().clear();
        thread.setTagCount(0);
        return thread;
    }

    private Thread setTags(Thread thread, Set<Tag> tags) {
        for (Tag tag : tags) {
            if (!thread.getTags().contains(tag)) {
                tag.getThreads().add(thread);
                tag.setThreadCount(tag.getThreadCount() + 1);
            }
        }
        thread.setTags(tags);
        thread.setTagCount(tags.size());
        return thread;
    }

    public Optional<Thread> getThreadEntity(String username, String channelSlug, String slug) {
        return threadRepository.findBySlugAndChannelSlug(slug, channelSlug);
    }

    public PageDTO<ThreadDTO> getThreads(String username, String channelSlug, Pageable pageable) {
        Page<ThreadDTO> threads = threadRepository.findAllByChannelSlug(channelSlug, pageable)
                .map(thread -> convertToDto(username, thread));
        return new PageDTO<>(threads);
    }

    public PageDTO<ThreadDTO> getMyThreads(String username, Pageable pageable) {
        Page<ThreadDTO> threads = threadRepository.findMyThreads(username, pageable)
                .map(thread -> convertToDto(username, thread));
        return new PageDTO<>(threads);
    }

    public void deleteThread(String username, String channelSlug, String slug) {
        Thread thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                .orElseThrow(() -> new RuntimeException("Thread not found"));
        Channel channel = thread.getChannel();
        thread = removeAllTags(thread);
        channel.setThreadCount(channel.getThreadCount() - 1);
        channel.getThreads().remove(thread);
        channelRepository.save(channel);
    }

    public void hideThread(String username, String channelSlug, String slug) {
        Thread thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                .orElseThrow(() -> new RuntimeException("Thread not found"));
        thread.setHidden(true);
        Channel channel = thread.getChannel();
        channel.setThreadCount(channel.getThreadCount() - 1);
        // channel.getThreads().remove(thread);
        channelRepository.save(channel);
    }

    public ThreadDTO subscribeThread(String username, String channelSlug, String slug) {
        Thread thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        AuthUser user = authUserRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (thread.isPremium() && !user.isPremium())
            return convertToDto(username, thread);

        if (!user.getSubscribedThreads().contains(thread)) {
            if (!channelRepository.isSubscribed(username, channelSlug)) {
                Channel channel = channelRepository.findBySlug(channelSlug)
                        .orElseThrow(() -> new RuntimeException("Channel not found"));
                channel.setSubscriberCount(channel.getSubscriberCount() + 1);
                channelRepository.save(channel);
            }
            user.getSubscribedThreads().add(thread);
            user.setSubscribedThreadsCount(user.getSubscribedThreadsCount() + 1);
            thread.getSubscribers().add(user);
            thread.setSubscriberCount(thread.getSubscriberCount() + 1);
            authUserRepository.save(user);
        }

        thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        return convertToDto(username, thread);
    }

    public ThreadDTO unsubscribeThread(String username, String channelSlug, String slug) {
        Thread thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        AuthUser user = authUserRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getSubscribedThreads().contains(thread)) {
            user.getSubscribedThreads().remove(thread);
            user.setSubscribedThreadsCount(user.getSubscribedThreadsCount() - 1);
            thread.getSubscribers().remove(user);
            thread.setSubscriberCount(thread.getSubscriberCount() - 1);
            if (!channelRepository.isSubscribed(username, channelSlug)) {
                Channel channel = channelRepository.findBySlug(channelSlug)
                        .orElseThrow(() -> new RuntimeException("Channel not found"));
                channel.setSubscriberCount(channel.getSubscriberCount() - 1);
                channelRepository.save(channel);
            }
            authUserRepository.save(user);
        }

        thread = threadRepository.findBySlugAndChannelSlug(slug, channelSlug)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        return convertToDto(username, thread);
    }

}