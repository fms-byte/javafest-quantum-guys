package com.quantumguys.janun.dto;

public class ResetPasswordDTO {
    private String token;
    private String password;

    public ResetPasswordDTO() {
    }

    public ResetPasswordDTO(String token, String password) {
        this.token = token;
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    
}
