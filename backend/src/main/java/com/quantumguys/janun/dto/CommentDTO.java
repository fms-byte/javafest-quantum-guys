package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {
    private long id;
    private String createdAt;
    private String createdAgo;
    private String updatedAt;
    private String updatedAgo;
    private boolean anonymous;
    private AuthUserMinDTO user;
    private String content;
    private String postSlug;
}