package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportDTO {
    
    private long id;
    private String reason;
    private String status;

    private AuthUserMinDTO user;
    private PostMinDTO post;
    private CommentDTO comment;
    private ThreadMinDTO thread;
}