package com.quantumguys.janun.dto;

import java.util.HashSet;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ThreadCreateDTO {
    private boolean premium;
    private String slug;
    private String name;
    private String description;
    private String language;
    private String city;
    private String country;
    private String logo;
    private String cover;

    private Set<String> links = new HashSet<>();
    private Set<TagMinDTO> tags = new HashSet<>();
}