package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostMinDTO {
    private String slug;
    private String title;
    private String type;
    private boolean premium;
    
    private String reaction;
    private boolean reacted;
    private boolean reported;
    private boolean commented;
    private boolean subscribed;
}