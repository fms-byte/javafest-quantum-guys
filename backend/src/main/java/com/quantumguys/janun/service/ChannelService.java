package com.quantumguys.janun.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quantumguys.janun.dto.ChannelCreateDTO;
import com.quantumguys.janun.dto.ChannelDTO;
import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.entity.AuthUser;
import com.quantumguys.janun.entity.Channel;
import com.quantumguys.janun.entity.Post;
import com.quantumguys.janun.entity.Tag;
import com.quantumguys.janun.repository.AuthUserRepository;
import com.quantumguys.janun.repository.ChannelRepository;
import com.quantumguys.janun.repository.PostRepository;
import com.quantumguys.janun.repository.TagRepository;

@Service
@Transactional
public class ChannelService {

    @Autowired
    private ChannelRepository channelRepository;

    @Autowired
    private AuthUserRepository userRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private PostRepository postRepository;

    
    public ChannelDTO createChannel(ChannelCreateDTO channelCreateDTO) {
        channelRepository.findBySlug(channelCreateDTO.getSlug())
            .ifPresent(channel -> {
                throw new RuntimeException("Channel already exists with slug " + channelCreateDTO.getSlug());
            });

        Channel channel = new Channel();
        channel.updateFromDto(channelCreateDTO);
        channel = channelRepository.save(channel);
        return channel.toDto(ChannelDTO.class);
    }

    public ChannelDTO updateChannel(String slug, ChannelCreateDTO channelUpdateDTO) {
        Channel channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));

        channel.updateFromDto(channelUpdateDTO);
        channel = channelRepository.save(channel);
        return channel.toDto(ChannelDTO.class);
    }

    public ChannelDTO getChannel(String slug) {
        Channel channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));
        return channel.toDto(ChannelDTO.class);
    }

    public PageDTO<ChannelDTO> getChannels(Pageable pageable) {
        Page<ChannelDTO> channels = channelRepository.findAll(pageable).map(channel -> channel.toDto(ChannelDTO.class));
        return new PageDTO<>(channels);
    }

    public void deleteChannel(String slug) {
        Channel channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));
        channelRepository.delete(channel);
    }

    public void addTag(String slug, Tag tag) {
        Channel channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));

        Tag oldTag = tagRepository.findByName(tag.getName()).orElse(null);
        if (oldTag != null) {
            tag = oldTag;
        }
        channel.addTag(tag);
        channelRepository.save(channel);
    }

    public void addTags(String slug, Set<Tag> tags) {
        Channel channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));

        Set<Tag> newTags = new HashSet<>();
        for (Tag tag : tags) {
            Tag oldTag = tagRepository.findByName(tag.getName()).orElse(null);
            if (oldTag != null) {
                tag = oldTag;
            }
            newTags.add(tag);
        }
        channel.addTag(newTags);
        channelRepository.save(channel);
    }

    public void removeTag(String slug, Tag tag) {
        Channel channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));
        
        Tag oldTag = tagRepository.findByName(tag.getName()).orElse(null);
        if (oldTag != null) {
            tag = oldTag;
        }
        channel.removeTag(tag);
        channelRepository.save(channel);
    }

    public void removeTags(String slug, Set<Tag> tags) {
        Channel channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));

        Set<Tag> newTags = new HashSet<>();
        for (Tag tag : tags) {
            Tag oldTag = tagRepository.findByName(tag.getName()).orElse(null);
            if (oldTag != null) {
                tag = oldTag;
            }
            newTags.add(tag);
        }
        channel.removeTag(newTags);
        channelRepository.save(channel);
    }

    public Set<Tag> getTags(String slug) {
        Channel channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));
        return channel.getTags();
    }

    public ChannelDTO subscribeChannel(String slug, String username) {
        Channel channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));
        AuthUser user = userRepository.findByUsername(username)
                            .orElseThrow(() -> new RuntimeException("User not found"));

        if(channelRepository.isUserSubscribedToAnyThread(user, channel))return channel.toDto(ChannelDTO.class);

        user.subscribe(channel);
        userRepository.save(user);
        
        channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));

        return channel.toDto(ChannelDTO.class);
    }

    public ChannelDTO unsubscribeChannel(String slug, String username) {
        Channel channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));
        AuthUser user = userRepository.findByUsername(username)
                            .orElseThrow(() -> new RuntimeException("User not found"));

        if(!channelRepository.isUserSubscribedToAnyThread(user, channel))return channel.toDto(ChannelDTO.class);
        
        user.unsubscribe(channel);
        userRepository.save(user);
        
        channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));
        
        return channel.toDto(ChannelDTO.class);
    }

    public PageDTO<Post> getPosts(String slug, String username, Pageable pageable) {
        boolean isPremium = false;
        if(username != null)isPremium = userRepository.existsByUsernameAndPremium(username, true);
        Page<Post> posts = postRepository.findByChannelSlug(slug, isPremium, pageable);
        return new PageDTO<>(posts);
    }

    public void hideChannel(String slug){
        Channel channel = channelRepository.findBySlug(slug)
                            .orElseThrow(() -> new RuntimeException("Channel not found"));
        channel.setHidden(true);
        channelRepository.save(channel);
    }

    public boolean existsBySlug(String slug) {
        return channelRepository.existsBySlug(slug);
    }
}