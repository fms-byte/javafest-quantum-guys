package com.quantumguys.janun.dto;

import com.quantumguys.janun.entity.AuthUser;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDTO {

    private String token;
    private AuthUserDTO user;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(AuthUser user,String token) {
        this.user = user.toDto(AuthUserDTO.class);
        this.token = token;
    }

}
