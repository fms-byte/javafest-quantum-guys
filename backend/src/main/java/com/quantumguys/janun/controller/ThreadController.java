package com.quantumguys.janun.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quantumguys.janun.dto.GeneralResponseDTO;
import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.dto.ThreadCreateDTO;
import com.quantumguys.janun.dto.ThreadDTO;
import com.quantumguys.janun.security.UserPrincipal;
import com.quantumguys.janun.service.ThreadService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Threads", description = "Endpoints for testing")
public class ThreadController {

    @Autowired
    private ThreadService threadService;

    @GetMapping("/channel/{ChannelSlug}/thread")
    @Operation(summary = "Get Threads", description = "Get all threads in a channel")
    @ApiResponse(responseCode = "200", description = "Threads", content = @Content(schema = @Schema(implementation = PageDTO.class)))
    public ResponseEntity<?> getChannels(
                                        @RequestParam(required = false) String search, 
                                        @RequestParam(required = false, defaultValue = "createdAt") String sort, 
                                        @RequestParam(required = false, defaultValue = "asc") String order, 
                                        @RequestParam(required = false, defaultValue = "0") Integer page
                                        ){
        try {
            // Pageable pageable = PageRequest.of(page, 10, Sort.Direction.fromString(order),sort);
            // PageDTO<ChannelDTO> channels = channelService.getChannels(pageable);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/channel/{ChannelSlug}/thread/{ThreadSlug}")
    @Operation(summary = "Get Thread", description = "Get a thread")
    @ApiResponse(responseCode = "200", description = "Thread", content = @Content(schema = @Schema(implementation = ThreadDTO.class)))
    public ResponseEntity<?> getChannelBySlug(@PathVariable String slug) {
        try {
            // ChannelDTO channel = channelService.getChannel(slug);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/channel/{ChannelSlug}/thread")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Create Thread", description = "Create a thread")
    @ApiResponse(responseCode = "200", description = "Thread", content = @Content(schema = @Schema(implementation = ThreadDTO.class)))
    public ResponseEntity<?> createChannel(@RequestBody ThreadCreateDTO threadCreateDTO) {
        try {
            // ChannelDTO channel = channelService.createChannel(channelCreateDTO);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PutMapping("/channel/{ChannelSlug}/thread/{ThreadSlug}")
    @PreAuthorize("hasAuthority('ADMIN', 'MANAGER')")
    @Operation(summary = "Update Thread", description = "Update a thread")
    @ApiResponse(responseCode = "200", description = "Thread", content = @Content(schema = @Schema(implementation = ThreadDTO.class)))
    public ResponseEntity<?> updateChannel(@PathVariable String slug, @RequestBody ThreadCreateDTO channelUpdateDTO) {
        try {
            // ChannelDTO channel = channelService.updateChannel(slug, channelUpdateDTO);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @DeleteMapping("/channel/{ChannelSlug}/thread/{ThreadSlug}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Delete Thread", description = "Delete a thread")
    @ApiResponse(responseCode = "200", description = "Channel", content = @Content(schema = @Schema(implementation = GeneralResponseDTO.class)))
    public ResponseEntity<?> deleteChannel(@PathVariable String slug) {
        try {
            // channelService.hideChannel(slug);
            return ResponseEntity.ok().body(new GeneralResponseDTO("Channel hidden successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }


    @PostMapping("/channel/{ChannelSlug}/thread/{ThreadSlug}/subscribe")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Subscribe to Thread", description = "Subscribe to a thread")
    @ApiResponse(responseCode = "200", description = "Thread", content = @Content(schema = @Schema(implementation = ThreadDTO.class)))
    public ResponseEntity<?> subscribeToChannel(@PathVariable String slug, @AuthenticationPrincipal UserPrincipal user) {
        try {
            // ChannelDTO channelDTO = channelService.subscribeChannel(slug, user.getUsername());
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/channel/{ChannelSlug}/thread/{ThreadSlug}/unsubscribe")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Unsubscribe from Thread", description = "Unsubscribe from a thread")
    @ApiResponse(responseCode = "200", description = "Thread", content = @Content(schema = @Schema(implementation = ThreadDTO.class)))
    public ResponseEntity<?> unsubscribeFromChannel(@PathVariable String slug, @AuthenticationPrincipal UserPrincipal user) {
        try {
            // ChannelDTO channelDTO = channelService.unsubscribeChannel(slug, user.getUsername());
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/channel/{ChannelSlug}/thread/{ThreadSlug}/posts")
    @Operation(summary = "Get Posts", description = "Get all posts in a channel")
    @ApiResponse(responseCode = "200", description = "Posts", content = @Content(schema = @Schema(implementation = PageDTO.class)))
    public ResponseEntity<?> getPostsInChannel(@AuthenticationPrincipal UserPrincipal user,
                                               @PathVariable String slug, 
                                               @RequestParam(required = false) String search, 
                                               @RequestParam(required = false, defaultValue = "createdAt") String sort, 
                                               @RequestParam(required = false, defaultValue = "asc") String order, 
                                               @RequestParam(required = false, defaultValue = "0") Integer page) {
        try {
            // Pageable pageable = PageRequest.of(page, 10, Sort.Direction.fromString(order), sort);
            // String username = user != null ? user.getUsername() : null;
            // PageDTO<Post> posts = channelService.getPosts(slug,username, pageable);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }
}