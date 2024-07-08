package com.quantumguys.janun.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quantumguys.janun.dto.AuthUserDTO;
import com.quantumguys.janun.dto.LoginDTO;
import com.quantumguys.janun.dto.LoginResponseDTO;
import com.quantumguys.janun.dto.RegisterDTO;
import com.quantumguys.janun.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Validated RegisterDTO registerDTO) {
        try {
            System.out.println(registerDTO.getEmail()+" "+registerDTO.getUsername()+" "+registerDTO.getPassword());
            AuthUserDTO user = userService.registerUser(registerDTO);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @Validated LoginDTO loginDTO) {
        try {
            LoginResponseDTO responseDTO = userService.loginUser(loginDTO);
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
