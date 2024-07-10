package com.quantumguys.janun.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quantumguys.janun.dto.AuthUserDTO;
import com.quantumguys.janun.dto.ChangePasswordDTO;
import com.quantumguys.janun.dto.ForgotPasswordDTO;
import com.quantumguys.janun.dto.LoginDTO;
import com.quantumguys.janun.dto.LoginResponseDTO;
import com.quantumguys.janun.dto.RegisterDTO;
import com.quantumguys.janun.dto.ResetPasswordDTO;
import com.quantumguys.janun.security.JwtProperties;
import com.quantumguys.janun.security.UserPrincipal;
import com.quantumguys.janun.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/auth")
@Tag(name = "Auth", description = "Endpoints for user authentication.\n\n" + 
        "## Public Endpoints:\n" +
        "- **/register:** Registers a new user.\n" +
        "- **/login:** Logs in a user.\n" +
        "- **/forgot-password:** Sends a reset password token to the user's email.\n" +
        "- **/reset-password:** Resets the user's password using the token.\n" +
        "- **/confirm:** Confirms the user's email using the token.\n\n" + 
        "After user registration, a confirmation email will be sent. If a GET request is made to `/confirm?token=` with the email token, the email will be confirmed.\n\n" +
        "If a POST request is made to `/forgot-password` with an email/username in the email field, a reset-password token will be sent to that user. If a POST request is made to `/reset-password` with that token and a new password, the password will be reset.\n\n" +
        "For other endpoints, login is required. If you provide the old and new password to `/change-password`, the password will be changed. If a GET request is made to `/logout`, the token will be removed from the cookie.\n\n" +
        "## Private Endpoints:\n" +
        "- **/user:** Gets the user details. Requires login.\n" +
        "- **/change-password:** Changes the user's password. Requires login.\n" +
        "- **/resend-email:** Resends the confirmation email. Requires login.\n"+
        "- **/logout:** Logs out the user.")


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

    @GetMapping("/user")
    @Operation(description = "Get user details if authenticated or throw an exception if not authenticated")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = AuthUserDTO.class)))
    public ResponseEntity<?> getUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            String username = userPrincipal.getUsername();
            AuthUserDTO user = userService.getUser(username);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/logout")
    @Operation(description = "Logout the user by deleting the token cookie")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = String.class)))
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        try {
            deleteCookie(response);
            return ResponseEntity.ok("Logged out successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/forgot-password")
    @Operation(description = "Send a password reset link to the user's email. Username or email can be used to send the link.")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = String.class)))
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDTO forgotPasswordDTO) {
        try {
            userService.forgotPassword(forgotPasswordDTO);
            return ResponseEntity.ok("Password reset link sent to your email");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    @Operation(description = "Reset the user's password using the token sent to the user's email")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = AuthUserDTO.class)))
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        try {
            AuthUserDTO user = userService.resetPassword(resetPasswordDTO);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/resend-email")
    @Operation(description = "Resend the confirmation email to the user's email")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = String.class)))
    public ResponseEntity<?> resendConfirmationEmail(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            userService.resendConfirmationEmail(userPrincipal.getEmail());
            return ResponseEntity.ok("Confirmation email sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/confirm")
    @Operation(description = "Confirm the user's email using the token sent to the user's email")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = String.class)))
    public ResponseEntity<?> confirmEmail(@RequestParam String token) {
        try {
            userService.confirmEmail(token);
            return ResponseEntity.ok("Email confirmed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/change-password")
    @Operation(description = "Change the user's password")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = AuthUserDTO.class)))
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestBody ChangePasswordDTO changePasswordDTO) {
        try {
            String username = userPrincipal.getUsername();
            AuthUserDTO user = userService.changePassword(username, changePasswordDTO);
            return ResponseEntity.ok(user);
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

    private void deleteCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
