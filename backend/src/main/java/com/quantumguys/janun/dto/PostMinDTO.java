package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostMinDTO {
    private String slug;
    private String title;
    private Boolean premium;
    private String type;
}