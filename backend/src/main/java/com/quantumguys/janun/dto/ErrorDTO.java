package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ErrorDTO {
    String message;

    public ErrorDTO(String message) {
        this.message = message;
    }
}