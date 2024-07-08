package com.quantumguys.janun.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtDecoder {
    
    @Autowired
    private JwtProperties jwtProperties;

    public DecodedJWT decode(String token){
        return JWT.require(Algorithm.HMAC256(jwtProperties.getSecret()))
                .build()
                .verify(token);
    }

}
