package com.quantumguys.janun.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
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
import com.quantumguys.janun.dto.PostsPage;
import com.quantumguys.janun.dto.ThreadsPage;
import com.quantumguys.janun.dto.PostDTO;
import com.quantumguys.janun.dto.ThreadCreateRequestDTO;
import com.quantumguys.janun.dto.ThreadDTO;
import com.quantumguys.janun.security.UserPrincipal;
import com.quantumguys.janun.service.PostService;
import com.quantumguys.janun.service.ThreadService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "06. Threads", description = "Endpoints for testing")
public class ThreadController {

    @Autowired
    private ThreadService threadService;

    @Autowired
    private PostService postService;

    @GetMapping("/channel/{channelSlug}/thread")
    @Operation(summary = "Get Threads", description = "Get all threads in a channel")
    @ApiResponse(responseCode = "200", description = "Threads", content = @Content(schema = @Schema(implementation = ThreadsPage.class)))
    public ResponseEntity<?> getThreads(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String channelSlug,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {

        try {
            Pageable pageable = PageRequest.of(page, Math.min(size, 20), Direction.fromString(order), sort);
            PageDTO<ThreadDTO> threads = threadService.getThreads(getUsername(user), channelSlug, pageable);
            return ResponseEntity.ok(threads);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/channel/{channelSlug}/thread/{threadSlug}")
    @Operation(summary = "Get Thread", description = "Get a thread")
    @ApiResponse(responseCode = "200", description = "Thread", content = @Content(schema = @Schema(implementation = ThreadDTO.class)))
    public ResponseEntity<?> getThread(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String channelSlug, @PathVariable String threadSlug) {

        try {
            ThreadDTO thread = threadService.getThread(getUsername(user), channelSlug, threadSlug);
            return ResponseEntity.ok(thread);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/channel/{channelSlug}/thread")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Create Thread", description = "Create a thread")
    @ApiResponse(responseCode = "200", description = "Thread", content = @Content(schema = @Schema(implementation = ThreadDTO.class)))
    public ResponseEntity<?> createThread(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String channelSlug,
            @RequestBody ThreadCreateRequestDTO threadCreateDTO) {
        try {
            ThreadDTO thread = threadService.createThread(getUsername(user), channelSlug, threadCreateDTO);
            return ResponseEntity.ok(thread);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PutMapping("/channel/{channelSlug}/thread/{threadSlug}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "Update Thread", description = "Update a thread")
    @ApiResponse(responseCode = "200", description = "Thread", content = @Content(schema = @Schema(implementation = ThreadDTO.class)))
    public ResponseEntity<?> updateThread(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String channelSlug, @PathVariable String threadSlug,
            @RequestBody ThreadCreateRequestDTO threadCreateDTO) {
        try {
            ThreadDTO thread = threadService.updateThread(getUsername(user), channelSlug, threadSlug, threadCreateDTO);
            return ResponseEntity.ok(thread);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @DeleteMapping("/channel/{channelSlug}/thread/{threadSlug}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Delete Thread", description = "Delete a thread")
    @ApiResponse(responseCode = "200", description = "Channel", content = @Content(schema = @Schema(implementation = GeneralResponseDTO.class)))
    public ResponseEntity<?> deleteThread(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String channelSlug, @PathVariable String threadSlug) {
        try {
            threadService.hideThread(getUsername(user), channelSlug, threadSlug);
            return ResponseEntity.ok().body(new GeneralResponseDTO("Channel hidden successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/channel/{channelSlug}/thread/{threadSlug}/subscribe")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Subscribe to Thread", description = "Subscribe to a thread")
    @ApiResponse(responseCode = "200", description = "Thread", content = @Content(schema = @Schema(implementation = ThreadDTO.class)))
    public ResponseEntity<?> subscribeThread(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String channelSlug, @PathVariable String threadSlug) {
        try {
            ThreadDTO threadDTO = threadService.subscribeThread(getUsername(user), channelSlug, threadSlug);
            return ResponseEntity.ok(threadDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/channel/{channelSlug}/thread/{threadSlug}/unsubscribe")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Unsubscribe from Thread", description = "Unsubscribe from a thread")
    @ApiResponse(responseCode = "200", description = "Thread", content = @Content(schema = @Schema(implementation = ThreadDTO.class)))
    public ResponseEntity<?> unsubscribeThread(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String channelSlug, @PathVariable String threadSlug) {
        try {
            ThreadDTO threadDTO = threadService.unsubscribeThread(getUsername(user), channelSlug, threadSlug);
            return ResponseEntity.ok(threadDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/channel/{channelSlug}/thread/{threadSlug}/posts")
    @Operation(summary = "Get Posts", description = "Get all posts in a channel")
    @ApiResponse(responseCode = "200", description = "Posts", content = @Content(schema = @Schema(implementation = PostsPage.class)))
    public ResponseEntity<?> getPostsInThread(@AuthenticationPrincipal UserPrincipal user,
            @PathVariable String channelSlug, @PathVariable String threadSlug,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page) {
        try {
            Pageable pageable = PageRequest.of(page, 10, Direction.fromString(order), sort);
            PageDTO<PostDTO> posts = postService.getThreadPosts(getUsername(user), channelSlug, threadSlug, pageable);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    private String getUsername(UserPrincipal user) {
        return user != null ? user.getUsername() : null;
    }
}