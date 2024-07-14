package com.quantumguys.janun.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {
    private long id;
    private LocalDateTime createdAt;
    private String content;
    private AuthUserMinDTO user;
    private boolean anonymous;
}