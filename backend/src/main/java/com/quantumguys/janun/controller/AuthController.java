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
import com.quantumguys.janun.security.JwtProperties;
import com.quantumguys.janun.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
@Tag(name = "Auth", description = "Endpoints for user authentication")
public class AuthController {

    @Autowired
    private AuthService userService;

    @Autowired
    private JwtProperties jwtProperties;

    @PostMapping("/register")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = AuthUserDTO.class)))
    public ResponseEntity<?> registerUser(@RequestBody @Validated RegisterDTO registerDTO) {
        try {
            AuthUserDTO user = userService.registerUser(registerDTO);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    @Operation(description = "Login with (username or email) and password")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = LoginResponseDTO.class)))
    public ResponseEntity<?> loginUser(@RequestBody @Validated LoginDTO loginDTO, HttpServletResponse response) {
        try {
            LoginResponseDTO responseDTO = userService.loginUser(loginDTO);
            addCookie(response, responseDTO.getToken());
            
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private void addCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int)jwtProperties.getExpiration());
        response.addCookie(cookie);
    }
}
