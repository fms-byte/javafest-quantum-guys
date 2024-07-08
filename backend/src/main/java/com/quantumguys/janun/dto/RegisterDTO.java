package com.quantumguys.janun.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class RegisterDTO {

    @NotEmpty(message = "Username is required")
    @Size(min = 3, max = 20, message = "Username should have between 3 and 20 characters")
    private String username;

    @Email(message = "Email should be valid")
    @NotEmpty(message = "Email is required")
    private String email;

    @Size(min = 6, max = 20, message = "Password should have between 6 and 20 characters")
    private String password;

    public RegisterDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    

}
