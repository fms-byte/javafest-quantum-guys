package com.quantumguys.janun.util;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quantumguys.janun.security.JwtProperties;

@Service
public class JwtToken {

    @Autowired
    private JwtProperties jwtProperties;

    private ObjectMapper objectMapper = new ObjectMapper();

    public String create(Object object, int expiration){
        try {
            String jsonPayload= objectMapper.writeValueAsString(object);
            return JWT.create()
                    .withSubject(jsonPayload)
                    .withExpiresAt(Instant.now().plusSeconds(expiration))
                    .sign(Algorithm.HMAC256(jwtProperties.getSecret()));
            
        } catch (Exception e) {
            throw new RuntimeException("Error creating JWT token"+e.getMessage());
        }
    }

    public <T> T verify(String token, Class<T> clazz){
        try {
            String jsonPayload = JWT.require(Algorithm.HMAC256(jwtProperties.getSecret()))
                    .build()
                    .verify(token)
                    .getSubject();
            return objectMapper.readValue(jsonPayload, clazz);
        } catch (Exception e) {
            throw new RuntimeException("Error parsing JWT token");
        }
    }

}
