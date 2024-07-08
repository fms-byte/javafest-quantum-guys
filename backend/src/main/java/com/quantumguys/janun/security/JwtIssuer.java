package com.quantumguys.janun.security;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.quantumguys.janun.entity.AuthUser;

@Component
public class JwtIssuer {

    @Autowired
    private JwtProperties jwtProperties;

    public String issue(AuthUser user){
        return JWT.create()
                .withSubject(String.valueOf(user.getId()))
                .withExpiresAt(Instant.now().plusSeconds(jwtProperties.getExpiration()))
                .withClaim("email", user.getEmail())
                .withClaim("username", user.getUsername())
                .withClaim("role", user.getRole())
                .sign(Algorithm.HMAC256(jwtProperties.getSecret()));
        
    }

}
