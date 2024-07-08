package com.quantumguys.janun.dto;

import com.quantumguys.janun.entity.AuthUser;

public class LoginResponseDTO {

    private String token;
    private AuthUserDTO user;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(AuthUser user,String token) {
        this.user = new AuthUserDTO(user);
        this.token = token;
    }

    public AuthUserDTO getUser() {
        return user;
    }

    public void setUser(AuthUserDTO user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
