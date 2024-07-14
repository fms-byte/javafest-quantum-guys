package com.quantumguys.janun.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quantumguys.janun.dto.CommentCreateDTO;
import com.quantumguys.janun.dto.CommentDTO;
import com.quantumguys.janun.dto.GeneralResponseDTO;
import com.quantumguys.janun.dto.PageCommentWrapper;
import com.quantumguys.janun.dto.PagePostWrapper;
import com.quantumguys.janun.dto.PostCreateDTO;
import com.quantumguys.janun.dto.PostDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "7. Post", description = "Endpoints for testing.")
public class PostController {

    // @Autowired
    // private PostService postService;

    @PostMapping("/post")
    @PreAuthorize("hasAuthority('BOT')")
    @Operation(summary = "create post", description = "create post")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PostDTO.class)))
    public ResponseEntity<?> createPost(@RequestBody PostCreateDTO postCreateDTO) {
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PutMapping("/post/{slug}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "update post", description = "update post")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PostDTO.class)))
    public ResponseEntity<?> updatePost(@RequestBody PostCreateDTO postCreateDTO) {
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @DeleteMapping("/post/{slug}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "delete post", description = "delete post")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = GeneralResponseDTO.class)))
    public ResponseEntity<?> deletePost(@PathVariable String slug) {
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/post")
    @Operation(summary = "get posts", description = "get posts")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PagePostWrapper.class)))
    public ResponseEntity<?> getPosts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page
    ) {
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/post/{slug}")
    @Operation(summary = "get post", description = "get post")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PostDTO.class)))
    public ResponseEntity<?> getPost(@PathVariable String slug) {
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/post/{slug}/react")
    @Operation(summary = "react to post", description = "react to post")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PostDTO.class)))
    public ResponseEntity<?> reactToPost(
                                            @PathVariable String slug,
                                            @Parameter(schema = @Schema(allowableValues = {"like", "dislike"})) 
                                            @RequestParam String type
                                            ){
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/post/{slug}/comment")
    @Operation(summary = "get comments", description = "get comments")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PageCommentWrapper.class)))
    public ResponseEntity<?> getComments(
            @PathVariable String slug,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page
    ) {
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/post/{slug}/comment")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "create comment", description = "create comment")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = CommentDTO.class)))
    public ResponseEntity<?> createComment(@PathVariable String slug, @RequestBody CommentCreateDTO commentCreateDTO) {
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }
}