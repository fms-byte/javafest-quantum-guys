package com.quantumguys.janun.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quantumguys.janun.dto.AuthUserDTO;
import com.quantumguys.janun.dto.ChangePasswordRequestDTO;
import com.quantumguys.janun.dto.ForgotPasswordRequestDTO;
import com.quantumguys.janun.dto.LoginRequestDTO;
import com.quantumguys.janun.dto.LoginResponseDTO;
import com.quantumguys.janun.dto.RegisterRequestDTO;
import com.quantumguys.janun.dto.ResetPasswordRequestDTO;
import com.quantumguys.janun.dto.UsernameAvailableResponseDTO;
import com.quantumguys.janun.entity.AuthUser;
import com.quantumguys.janun.repository.AuthUserRepository;
import com.quantumguys.janun.security.JwtIssuer;
import com.quantumguys.janun.security.UserPrincipal;
import com.quantumguys.janun.util.EmailService;
import com.quantumguys.janun.util.JwtPayload;
import com.quantumguys.janun.util.JwtToken;

@Service
@Transactional
public class AuthService {

    @Autowired
    private AuthUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtIssuer jwtIssuer;

    @Autowired
    private JwtToken jwtToken;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmailService emailService;


     public AuthUserDTO registerUser(RegisterRequestDTO registerDTO) {
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

        String token = jwtToken.create(new JwtPayload(savedUser.getEmail(),"confirmEmail"), 60*60*24*30);
        emailService.sendConfirmationEmail(user.getEmail(), token);
        return savedUser.toDto(AuthUserDTO.class);
    }

    public LoginResponseDTO loginUser(LoginRequestDTO loginDTO) {
         var authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        var principal = (UserPrincipal) authentication.getPrincipal();

        AuthUser user = userRepository.findByUsername(principal.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(user.isBanned()) throw new RuntimeException("User is banned");
        // if(!user.isEmailConfirmed()) throw new RuntimeException("Email not confirmed");

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        var token = jwtIssuer.issue(user);
        
        return new LoginResponseDTO(user, token);
    }

    public AuthUserDTO getUser(String username) {
        AuthUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.toDto(AuthUserDTO.class);
    }

    public void forgotPassword(ForgotPasswordRequestDTO forgotPasswordDTO) {
        AuthUser user = userRepository.findByUsernameOrEmail(forgotPasswordDTO.getEmail(), forgotPasswordDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtToken.create(new JwtPayload(user.getEmail(),"resetPassword"), 60*60);
        emailService.sendPasswordResetEmail(user.getEmail(), token);
    }

    public AuthUserDTO resetPassword(ResetPasswordRequestDTO resetPasswordDTO) {
        JwtPayload jwtPayload = jwtToken.verify(resetPasswordDTO.getToken(), JwtPayload.class);

        if(!jwtPayload.getType().equals("resetPassword")) {
            throw new RuntimeException("Invalid token");
        }
        
        AuthUser user = userRepository.findByEmail(jwtPayload.getText())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(resetPasswordDTO.getPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        AuthUser savedUser = userRepository.save(user);

        return savedUser.toDto(AuthUserDTO.class);
    }

    public void resendConfirmationEmail(String email) {
        AuthUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(user.isEmailConfirmed()) {
            throw new RuntimeException("Email already confirmed");
        }

        String token = jwtToken.create(new JwtPayload(user.getEmail(),"confirmEmail"), 60*60*24*30);
        emailService.sendConfirmationEmail(user.getEmail(), token);
    }

    public void confirmEmail(String token) {
        JwtPayload jwtPayload = jwtToken.verify(token, JwtPayload.class);

        if(!jwtPayload.getType().equals("confirmEmail")) {
            throw new RuntimeException("Invalid token");
        }

        AuthUser user = userRepository.findByEmail(jwtPayload.getText())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEmailConfirmed(true);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    public AuthUserDTO changePassword(String username, ChangePasswordRequestDTO changePasswordDTO) {
        AuthUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(changePasswordDTO.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        user.setUpdatedAt(LocalDateTime.now());

        AuthUser savedUser = userRepository.save(user);
        return savedUser.toDto(AuthUserDTO.class);
    }

    public UsernameAvailableResponseDTO isUsernameAvailable(String username) {
        return new UsernameAvailableResponseDTO(username,!userRepository.existsByUsername(username));
    }
}
