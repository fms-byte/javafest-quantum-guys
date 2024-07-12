package com.quantumguys.janun.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.quantumguys.janun.dto.AuthUserDTO;
import com.quantumguys.janun.dto.ErrorDTO;
import com.quantumguys.janun.dto.ProfileDto;
import com.quantumguys.janun.security.UserPrincipal;
import com.quantumguys.janun.service.ProfileService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Profile", description = "Endpoints for user profile.\n\n" + 
        "## Public Endpoints:\n" +
        "- **/profile/{username}:** Gets the profile by username.\n" +
        "## Private Endpoints:\n" +
        "- **/profile:** Gets the user's profile.\n" +
        "- **/profile:** Updates the user's profile. Requires login.")

public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/profile")
    @Operation(summary = "Get the user's profile", description = "Get the user's profile")
    @ApiResponse(responseCode = "200", description = "Profile retrieved", content = @Content(schema = @Schema(implementation = ProfileDto.class)))
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            return ResponseEntity.ok(profileService.getProfile(userPrincipal.getUsername()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }
    }

    @GetMapping("/profile/{username}")
    @Operation(summary = "Get the profile by username", description = "Get the profile by username")
    @ApiResponse(responseCode = "200", description = "Profile retrieved", content = @Content(schema = @Schema(implementation = ProfileDto.class)))
    public ResponseEntity<?> getProfileByUsername(@PathVariable String username) {
        try {
            return ResponseEntity.ok(profileService.getProfile(username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }
    }

    @PostMapping("/profile")
    @Operation(summary = "Update the user's profile", description = "Update the user's profile")
    @ApiResponse(responseCode = "200", description = "Profile updated", content = @Content(schema = @Schema(implementation = AuthUserDTO.class)))
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestBody ProfileDto profile) {
        try {
            return ResponseEntity.ok(profileService.updateProfile(userPrincipal.getUsername(), profile));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }
    }
}
