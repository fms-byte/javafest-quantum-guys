package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TagCreateRequestDTO {
    private String name;
    private String description;
}