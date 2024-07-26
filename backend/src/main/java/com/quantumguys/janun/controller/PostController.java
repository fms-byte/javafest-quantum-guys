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

import com.quantumguys.janun.dto.CommentCreateDTO;
import com.quantumguys.janun.dto.CommentDTO;
import com.quantumguys.janun.dto.GeneralResponseDTO;
import com.quantumguys.janun.dto.PageCommentWrapper;
import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.dto.PagePostWrapper;
import com.quantumguys.janun.dto.PostCreateDTO;
import com.quantumguys.janun.dto.PostDTO;
import com.quantumguys.janun.security.UserPrincipal;
import com.quantumguys.janun.service.PostService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "07. Post", description = "Endpoints for testing.")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/post")
    @PreAuthorize("hasAuthority('BOT')")
    @Operation(summary = "create post", description = "create post")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PostDTO.class)))
    public ResponseEntity<?> createPost(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody PostCreateDTO postCreateDTO) {
        try {
            PostDTO postDTO = postService.createPost(getUsername(user), postCreateDTO);
            return ResponseEntity.ok(postDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PutMapping("/post/{slug}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "update post", description = "update post")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PostDTO.class)))
    public ResponseEntity<?> updatePost(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String slug,
            @RequestBody PostCreateDTO postCreateDTO) {
        try {
            PostDTO postDTO = postService.updatePost(getUsername(user), slug, postCreateDTO);
            return ResponseEntity.ok(postDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @DeleteMapping("/post/{slug}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "delete post", description = "delete post")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = GeneralResponseDTO.class)))
    public ResponseEntity<?> deletePost(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String slug) {
        try {
            postService.deletePost(slug);
            return ResponseEntity.ok(new GeneralResponseDTO("Post deleted"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/post")
    @Operation(summary = "get posts", description = "get posts")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PagePostWrapper.class)))
    public ResponseEntity<?> getPosts(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "desc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page) {
        try {
            Pageable pageable = PageRequest.of(page, 10, Direction.fromString(order), sort);
            PageDTO<PostDTO> posts = postService.getPosts(getUsername(user), pageable);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/post/{slug}")
    @Operation(summary = "get post", description = "get post")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PostDTO.class)))
    public ResponseEntity<?> getPost(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String slug) {
        try {
            PostDTO postDTO = postService.getPost(getUsername(user), slug);
            return ResponseEntity.ok(postDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/post/{slug}/react")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "react to post", description = "react to post")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PostDTO.class)))
    public ResponseEntity<?> reactToPost(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String slug,
            @Parameter(schema = @Schema(allowableValues = { "like", "dislike" }))
            @RequestParam(required = false) String type) {
        try {
            PostDTO postDTO = postService.react(getUsername(user), slug, type);
            return ResponseEntity.ok(postDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/post/{slug}/comment")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "create comment", description = "create comment")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = CommentDTO.class)))
    public ResponseEntity<?> createComment(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String slug,
            @RequestBody CommentCreateDTO commentCreateDTO) {
        try {
            CommentDTO commentDTO = postService.addComment(getUsername(user), slug, commentCreateDTO);
            return ResponseEntity.ok(commentDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/post/{slug}/comment")
    @Operation(summary = "get comments", description = "get comments")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PageCommentWrapper.class)))
    public ResponseEntity<?> getComments(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String slug,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "desc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {
        try {
            Pageable pageable = PageRequest.of(page, Math.min(20, size), Direction.fromString(order), sort);
            PageDTO<CommentDTO> comments = postService.getComments(getUsername(user), slug, pageable);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/post/{slug}/comment/{commentId}")
    @Operation(summary = "get comment", description = "get comment")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = CommentDTO.class)))
    public ResponseEntity<?> getComment(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String slug,
            @PathVariable long commentId) {
        try {
            CommentDTO comment = postService.getComment(getUsername(user), slug, commentId);
            return ResponseEntity.ok(comment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/post/{slug}/my-comments")
    @Operation(summary = "get my comments", description = "get my comments")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PageCommentWrapper.class)))
    public ResponseEntity<?> getMyComments(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String slug,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "desc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {
        try {
            Pageable pageable = PageRequest.of(page, Math.min(20, size), Direction.fromString(order), sort);
            PageDTO<CommentDTO> comments = postService.getMyComments(getUsername(user), slug, pageable);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @DeleteMapping("/post/{slug}/comment/{commentId}")
    @Operation(summary = "delete comment", description = "delete comment")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = GeneralResponseDTO.class)))
    public ResponseEntity<?> deleteComment(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String slug,
            @PathVariable long commentId) {
        try {
            postService.deleteComment(getUsername(user), slug, commentId);
            return ResponseEntity.ok(new GeneralResponseDTO("Comment has been deleted"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    private String getUsername(UserPrincipal user) {
        return user != null ? user.getUsername() : null;
    }
}