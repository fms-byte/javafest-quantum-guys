package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsernameAvailableResponseDTO {
    private boolean available;
    private String message;
    private String username;
    
    public UsernameAvailableResponseDTO(String username, boolean available) {
        this.username = username;
        this.available = available;
        this.message = available ? username + " is available" : username + " is not available";
    }
}