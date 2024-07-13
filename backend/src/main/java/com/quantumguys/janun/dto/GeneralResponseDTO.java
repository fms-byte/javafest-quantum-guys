package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GeneralResponseDTO {
    String message;

    public GeneralResponseDTO(String message) {
        this.message = message;
    }
}