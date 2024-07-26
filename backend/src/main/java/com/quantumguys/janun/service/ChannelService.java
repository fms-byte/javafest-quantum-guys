package com.quantumguys.janun.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quantumguys.janun.dto.ChannelCreateDTO;
import com.quantumguys.janun.dto.ChannelDTO;
import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.dto.TagMinDTO;
import com.quantumguys.janun.dto.ThreadMinDTO;
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
public class ChannelService {

    @Autowired
    private ChannelRepository channelRepository;

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private AuthUserRepository authUserRepository;

    public ChannelDTO createChannel(String username, ChannelCreateDTO channelCreateDTO) {
        channelRepository.findBySlug(channelCreateDTO.getSlug())
                .ifPresent(channel -> {
                    throw new RuntimeException("Channel already exists with slug " + channelCreateDTO.getSlug());
                });

        Channel channel = new Channel();
        channel.updateFromDto(channelCreateDTO);

        if (channelCreateDTO.getTags() != null) {
            // get real tags from db
            Set<String> tagNames = channelCreateDTO.getTags().stream().map(TagMinDTO::getName)
                    .collect(Collectors.toSet());
            Set<Tag> oldTags = tagRepository.getTags(tagNames);

            // add the channel in the tags and increase the channel count of the tags
            for (Tag tag : oldTags) {
                tag.getChannels().add(channel);
                tag.setChannelCount(tag.getChannelCount() + 1);
            }
            // set the tags of the channel and update the tag count
            channel.setTags(oldTags);
            channel.setTagCount(oldTags.size());
        }

        if (channelCreateDTO.getLinks() != null) {
            channel.setLinkCount(channelCreateDTO.getLinks().size());
        }
        channel = channelRepository.save(channel);
        return convertToDto(username, channel);
    }

    public ChannelDTO updateChannel(String username, String slug, ChannelCreateDTO channelUpdateDTO) {
        Channel channel = channelRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        // remove the old tags
        channel = removeAllTags(channel);
        // add new tags
        if (channelUpdateDTO.getTags() != null) {
            // get real tags from db
            Set<String> tagNames = channelUpdateDTO.getTags().stream().map(TagMinDTO::getName)
                    .collect(Collectors.toSet());
            Set<Tag> oldTags = tagRepository.getTags(tagNames);

            channel = setTags(channel, oldTags);
        }
        // update the channel
        channelUpdateDTO.setTags(null);
        channel.updateFromDto(channelUpdateDTO);
        if (channelUpdateDTO.getLinks() != null) {
            channel.setLinkCount(channelUpdateDTO.getLinks().size());
        }
        channel = channelRepository.save(channel);
        return convertToDto(username, channel);
    }

    private Channel removeAllTags(Channel channel) {
        if (channel.getTags() != null) {
            for (Tag tag : channel.getTags()) {
                tag.getChannels().remove(channel);
                tag.setChannelCount(tag.getChannelCount() - 1);
            }
        }
        channel.getTags().clear();
        channel.setTagCount(0);
        return channel;
    }

    private Channel setTags(Channel channel, Set<Tag> tags) {
        for (Tag tag : tags) {
            if (!channel.getTags().contains(tag)) {
                tag.getChannels().add(channel);
                tag.setChannelCount(tag.getChannelCount() + 1);
            }
        }
        channel.setTags(tags);
        channel.setTagCount(tags.size());
        return channel;
    }

    public ChannelDTO getChannel(String username, String slug) {
        Channel channel = channelRepository.findAllowedChannel(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        ChannelDTO channelDTO = convertToDto(username, channel);

        return channelDTO;
    }

    public PageDTO<ChannelDTO> getChannels(String username, Pageable pageable) {
        Page<Channel> channels = channelRepository.findAll(pageable);

        return new PageDTO<>(
                channels.map(channel -> convertToDto(username, channel)));
    }

    public PageDTO<ChannelDTO> getMyChannels(String username, Pageable pageable) {
        Page<Channel> channels = channelRepository.findMyChannels(username, pageable);

        return new PageDTO<>(
                channels.map(channel -> convertToDto(username, channel)));
    }

    public void deleteChannel(String username, String slug) {
        Channel channel = channelRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        channel = removeAllTags(channel);
        channelRepository.delete(channel);
    }

    public ChannelDTO addTag(String username, String slug, Tag tag) {
        Channel channel = channelRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        Tag oldTag = tagRepository.getTag(tag);
        if (!channel.getTags().contains(oldTag)) {
            oldTag.getChannels().add(channel);
            oldTag.setChannelCount(oldTag.getChannelCount() + 1);

            channel.getTags().add(oldTag);
            channel.setTagCount(channel.getTagCount() + 1);
        }
        return channelRepository.save(channel).toDto(isSubscribed(username, slug), ChannelDTO.class);
    }

    public ChannelDTO addTags(String username, String slug, Set<Tag> tags) {
        Channel channel = channelRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        Set<Tag> newTags = new HashSet<>();
        for (Tag tag : tags)
            newTags.add(tagRepository.getTag(tag));

        for (Tag tag : newTags) {
            if (!channel.getTags().contains(tag)) {
                tag.getChannels().add(channel);
                tag.setChannelCount(tag.getChannelCount() + 1);

                channel.getTags().add(tag);
                channel.setTagCount(channel.getTagCount() + 1);
            }
        }

        return channelRepository.save(channel).toDto(isSubscribed(username, slug), ChannelDTO.class);
    }

    public ChannelDTO removeTag(String username, String slug, Tag tag) {
        Channel channel = channelRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        Tag oldTag = tagRepository.getTag(tag);

        if (channel.getTags().contains(oldTag)) {
            oldTag.getChannels().remove(channel);
            oldTag.setChannelCount(oldTag.getChannelCount() - 1);

            channel.getTags().remove(oldTag);
            channel.setTagCount(channel.getTagCount() - 1);
        }

        return channelRepository.save(channel).toDto(isSubscribed(username, slug), ChannelDTO.class);
    }

    public ChannelDTO removeTags(String username, String slug, Set<Tag> tags) {
        Channel channel = channelRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        Set<Tag> newTags = new HashSet<>();
        for (Tag tag : tags)
            newTags.add(tagRepository.getTag(tag));

        for (Tag tag : newTags) {
            if (channel.getTags().contains(tag)) {
                tag.getChannels().remove(channel);
                tag.setChannelCount(tag.getChannelCount() - 1);

                channel.getTags().remove(tag);
                channel.setTagCount(channel.getTagCount() - 1);
            }
        }

        return channelRepository.save(channel).toDto(isSubscribed(username, slug), ChannelDTO.class);
    }

    public Set<Tag> getTags(String username, String slug) {
        Channel channel = channelRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        return channel.getTags();
    }

    public ChannelDTO subscribeChannel(String username, String slug) {
        Channel channel = channelRepository.findAllowedChannel(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        AuthUser user = authUserRepository.getUser(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (channel.isPremium() && !user.isPremium()) {
            return convertToDto(username, channel);
        }

        if (!isSubscribed(username, slug)) {
            if (channel.getThreads() != null && channel.getThreads().size() > 0) {
                for (Thread thread : channel.getThreads()) {
                    if (thread.isPremium() && !user.isPremium())
                        continue;

                    if (!user.getSubscribedThreads().contains(thread)) {
                        user.getSubscribedThreads().add(thread);
                        user.setSubscribedThreadsCount(user.getSubscribedThreadsCount() + 1);
                        thread.getSubscribers().add(user);
                        thread.setSubscriberCount(thread.getSubscriberCount() + 1);
                    }
                }
                authUserRepository.save(user);
                channel.setSubscriberCount(channel.getSubscriberCount() + 1);
                channelRepository.save(channel);
            }
        }

        channel = channelRepository.findAllowedChannel(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        return convertToDto(username, channel);
    }

    public ChannelDTO unsubscribeChannel(String username, String slug) {
        Channel channel = channelRepository.findAllowedChannel(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        AuthUser user = authUserRepository.getUser(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (isSubscribed(username, slug)) {
            if (channel.getThreads() != null && channel.getThreads().size() > 0) {
                for (Thread thread : channel.getThreads()) {
                    if (!user.getSubscribedThreads().contains(thread))
                        continue;

                    user.getSubscribedThreads().remove(thread);
                    user.setSubscribedThreadsCount(user.getSubscribedThreadsCount() - 1);
                    thread.getSubscribers().remove(user);
                    thread.setSubscriberCount(thread.getSubscriberCount() - 1);
                }
                authUserRepository.save(user);
                channel.setSubscriberCount(channel.getSubscriberCount() - 1);
                channelRepository.save(channel);
            }
        }

        channel = channelRepository.findAllowedChannel(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        return convertToDto(username, channel);
    }

    public void hideChannel(String username, String slug) {
        Channel channel = channelRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        channel.setHidden(true);
        channelRepository.save(channel);
    }

    public boolean existsBySlug(String slug) {
        return channelRepository.existsBySlug(slug);
    }

    public boolean isSubscribed(String username, String channelSlug) {
        if (username == null || channelSlug == null) {
            return false;
        }
        return channelRepository.isSubscribed(username, channelSlug);
    }

    public Optional<Channel> getChannelBySlug(String slug) {
        return channelRepository.findBySlug(slug);
    }

    private ChannelDTO convertToDto(String username, Channel channel) {
        ChannelDTO channelDTO = channel.toDto(isSubscribed(username, channel.getSlug()), ChannelDTO.class);
        if (channelDTO.getThreads() != null) {
            Set<ThreadMinDTO> threads = new HashSet<>();
            for (ThreadMinDTO threadMinDTO : channelDTO.getThreads()) {
                boolean isSubscribed = threadRepository.isSubscribed(username, channel.getSlug(),
                        threadMinDTO.getSlug());
                threadMinDTO.setSubscribed(isSubscribed);
                threads.add(threadMinDTO);
            }
            channelDTO.setThreads(threads);
        }
        return channelDTO;
    }
}