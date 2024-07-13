package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChannelMinDTO {
    private boolean premium;
    private String slug;
    private String name;
}