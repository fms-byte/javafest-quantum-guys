package com.quantumguys.janun.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AuthUserDTO extends AuthUserMinDTO {
    
    private String email;
    private String phone;
    private String role;
    private boolean emailConfirmed;
    
    private ProfileDTO profile;
}

