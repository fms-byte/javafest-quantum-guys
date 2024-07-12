package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgotPasswordDTO {

    private String email;

    public ForgotPasswordDTO() {
    }

    public ForgotPasswordDTO(String email) {
        this.email = email;
    }
}
