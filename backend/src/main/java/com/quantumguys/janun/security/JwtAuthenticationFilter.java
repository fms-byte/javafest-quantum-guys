package com.quantumguys.janun.security;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtDecoder jwtDecoder;
    private JwtToPricipalConverter jwtToPricipalConverter;

    @Autowired
    private JwtProperties jwtProperties;

    public JwtAuthenticationFilter(JwtDecoder jwtDecoder, JwtToPricipalConverter jwtToPricipalConverter) {
        this.jwtDecoder = jwtDecoder;
        this.jwtToPricipalConverter = jwtToPricipalConverter;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        extractToken(request)
            .map(jwtDecoder::decode)
            .map(jwtToPricipalConverter::convert)
            .map(UserPrincipalAuthenticationToken::new)
            .ifPresent(authentication -> {
                SecurityContextHolder.getContext().setAuthentication(authentication);
            });

        filterChain.doFilter(request, response);
    }

    private Optional<String> extractToken(HttpServletRequest request){
        var header = request.getHeader(jwtProperties.getHeader());
        if(StringUtils.hasText(header) && header.startsWith("Bearer ")){
            return Optional.of(header.substring(7));
        }
        return Optional.empty();
    }

    // Get token from authorization header or cookie
    // private Optional<String> extractToken(HttpServletRequest request){
    //     var header = request.getHeader(jwtProperties.getHeader());
    //     if(StringUtils.hasText(header) && header.startsWith("Bearer ")){
    //         return Optional.of(header.substring(7));
    //     }
        
    //     // Get token from cookie
    //     var cookie = WebUtils.getCookie(request, "token");
    //     if(cookie != null){
    //         return Optional.of(cookie.getValue());
    //     }
        
    //     return Optional.empty();
    // }
}
