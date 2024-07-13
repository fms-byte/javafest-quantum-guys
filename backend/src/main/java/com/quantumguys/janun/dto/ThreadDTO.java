package com.quantumguys.janun.dto;

import java.util.HashSet;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ThreadDTO extends ThreadMinDTO {
    private String description;
    private String language;
    private String city;
    private String country;
    private String logo;
    private String cover;
    
    private Set<String> links = new HashSet<>();
    
    private long subscriberCount;
    private long postCount;
    private long tagCount;
    
    private ChannelMinDTO channel;
    private Set<String> channelLinks = new HashSet<>();
    private Set<TagMinDTO> tags = new HashSet<>();
}