package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReactionDTO {

    private long id;
    private String createdAt;
    private String createdAgo;
    private String updatedAt;
    private String updatedAgo;
    private AuthUserMinDTO user;
    private String postSlug;
    private String type;
    
}