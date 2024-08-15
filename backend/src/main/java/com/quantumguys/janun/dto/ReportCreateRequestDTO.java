package com.quantumguys.janun.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportCreateRequestDTO {
    private String reason;
    
    @Schema(description = "Type of the report", allowableValues = {"post", "comment", "thread"})
    private String type; // post, comment, thread

    private String channelSlug;
    private String threadSlug;
    private String postSlug;
    private Long commentId;
}