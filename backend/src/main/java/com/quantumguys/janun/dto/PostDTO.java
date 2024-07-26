package com.quantumguys.janun.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDTO extends PostMinDTO{
    private String content;
    private String status;

    private String createdAgo;
    private String updatedAgo;

    private Long views;
    private Long likesCount;
    private Long dislikesCount;
    private Long commentsCount;
    private Long sharesCount;
    private Long reportsCount;
    private Long tagCount;

    private ThreadMinDTO thread;
    private ChannelMinDTO channel;
    private Set<TagMinDTO> tags = new HashSet<>();
    private List<MediaMinDTO> media = new ArrayList<>();
}