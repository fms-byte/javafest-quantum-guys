package com.quantumguys.janun.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {

    @NotEmpty(message = "Username cannot be empty")
    @Schema(description = "Username", example = "test")
    private String username;

    @Size(min = 6, max = 20, message = "Password should have between 6 and 20 characters")
    @Schema(description = "Password", example = "12345678")
    private String password;

    public LoginDTO() {
    }

    public LoginDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

}
