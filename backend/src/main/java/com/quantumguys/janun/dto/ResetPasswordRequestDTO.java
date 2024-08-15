package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequestDTO {
    private String token;
    private String password;

    public ResetPasswordRequestDTO() {
    }

    public ResetPasswordRequestDTO(String token, String password) {
        this.token = token;
        this.password = password;
    }
    
}
