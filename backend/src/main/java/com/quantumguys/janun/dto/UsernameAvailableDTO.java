package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsernameAvailableDTO {
    private boolean available;
    
    public UsernameAvailableDTO(boolean available) {
        this.available = available;
    }
}