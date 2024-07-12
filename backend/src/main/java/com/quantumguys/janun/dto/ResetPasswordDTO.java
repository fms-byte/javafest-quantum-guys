package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordDTO {
    private String token;
    private String password;

    public ResetPasswordDTO() {
    }

    public ResetPasswordDTO(String token, String password) {
        this.token = token;
        this.password = password;
    }
    
}
