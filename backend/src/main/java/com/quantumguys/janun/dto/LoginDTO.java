package com.quantumguys.janun.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class LoginDTO {

    @NotEmpty(message = "Username cannot be empty")
    private String username;

    @Size(min = 6, max = 20, message = "Password should have between 6 and 20 characters")
    private String password;

    public LoginDTO() {
    }

    public LoginDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
