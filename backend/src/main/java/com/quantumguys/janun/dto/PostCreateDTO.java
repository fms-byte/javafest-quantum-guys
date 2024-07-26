package com.quantumguys.janun.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostCreateDTO {
    private String channelSlug;
    private String threadSlug;

    private String title;
    private String content;

    @Schema(description = "Type of the post", allowableValues = {"post"})
    private String type;

    @Schema(description = "Status of the post", allowableValues = {"draft", "published"})
    private String status;
    
    private boolean premium;

    private Set<TagMinDTO> tags = new HashSet<>();
    private List<MediaMinDTO> media = new ArrayList<>();
}