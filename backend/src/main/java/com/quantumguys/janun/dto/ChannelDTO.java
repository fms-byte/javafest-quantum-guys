package com.quantumguys.janun.dto;

import java.util.HashSet;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChannelDTO {
    private boolean premium;
    private String slug;
    private String name;
    private String description;
    private String language;
    private String city;
    private String country;
    private String logo;
    private String cover;
    
    private long subscriberCount;
    private long postCount;
    private long linkCount;
    private long threadCount;
    private long tagCount;

    private Set<String> links = new HashSet<>();
    private Set<ThreadMinDTO> threads = new HashSet<>();
    private Set<TagMinDTO> tags = new HashSet<>();


    private Boolean subscribed;
}