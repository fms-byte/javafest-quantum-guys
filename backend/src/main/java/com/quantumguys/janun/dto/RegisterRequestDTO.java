package com.quantumguys.janun.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {

    @NotEmpty(message = "Username is required")
    @Size(min = 3, max = 20, message = "Username should have between 3 and 20 characters")
    private String username;

    @Email(message = "Email should be valid")
    @NotEmpty(message = "Email is required")
    private String email;

    @Size(min = 6, max = 20, message = "Password should have between 6 and 20 characters")
    private String password;

    public RegisterRequestDTO() {
    }

}
