package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TagDTO extends TagMinDTO {
    private String description;

    private long postCount;
    private long threadCount;
    private long channelCount;
}