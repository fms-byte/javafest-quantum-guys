package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChannelMinDTO {
    private String slug;
    private String name;
    private boolean premium;
    private boolean subscribed;
}