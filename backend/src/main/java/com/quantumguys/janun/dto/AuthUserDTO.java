package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AuthUserDTO {

    private String username;
    private String email;
    private String phone;
    private ProfileDto profile;
    private String role;
    private boolean emailConfirmed;
    private boolean premium;
}

