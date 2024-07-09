package com.quantumguys.janun.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.quantumguys.janun.dto.AuthUserDTO;
import com.quantumguys.janun.dto.LoginDTO;
import com.quantumguys.janun.dto.LoginResponseDTO;
import com.quantumguys.janun.dto.RegisterDTO;
import com.quantumguys.janun.entity.AuthUser;
import com.quantumguys.janun.repository.AuthUserRepository;
import com.quantumguys.janun.security.JwtIssuer;
import com.quantumguys.janun.security.UserPrincipal;

@Service
public class AuthService {

    @Autowired
    private AuthUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtIssuer jwtIssuer;

    @Autowired
    private AuthenticationManager authenticationManager;


     public AuthUserDTO registerUser(RegisterDTO registerDTO) {
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        if(userRepository.existsByUsername(registerDTO.getUsername())) {
            throw new RuntimeException("Username already in use");
        }

        AuthUser user = new AuthUser();
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        user.setRole("USER");

        AuthUser savedUser = userRepository.save(user);
        return new AuthUserDTO(savedUser);
    }

    public LoginResponseDTO loginUser(LoginDTO loginDTO) {
         var authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        var principal = (UserPrincipal) authentication.getPrincipal();

        AuthUser user = userRepository.findByUsername(principal.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        var token = jwtIssuer.issue(user);
        
        return new LoginResponseDTO(user, token);
    }
}
