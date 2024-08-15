package com.quantumguys.janun.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quantumguys.janun.dto.AuthUserDTO;
import com.quantumguys.janun.dto.ChannelDTO;
import com.quantumguys.janun.dto.CommentDTO;
import com.quantumguys.janun.dto.GeneralResponseDTO;
import com.quantumguys.janun.dto.ChannelsPage;
import com.quantumguys.janun.dto.CommentsPage;
import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.dto.PostsPage;
import com.quantumguys.janun.dto.ReactionsPage;
import com.quantumguys.janun.dto.ReportsPage;
import com.quantumguys.janun.dto.ThreadsPage;
import com.quantumguys.janun.dto.PostDTO;
import com.quantumguys.janun.dto.ReactionDTO;
import com.quantumguys.janun.dto.ReportDTO;
import com.quantumguys.janun.dto.ThreadDTO;
import com.quantumguys.janun.security.UserPrincipal;
import com.quantumguys.janun.service.AuthService;
import com.quantumguys.janun.service.ChannelService;
import com.quantumguys.janun.service.CommentService;
import com.quantumguys.janun.service.PostService;
import com.quantumguys.janun.service.ReactionService;
import com.quantumguys.janun.service.ReportService;
import com.quantumguys.janun.service.ThreadService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@PreAuthorize("isAuthenticated()")
@RequestMapping("/my")
@Tag(name = "10. My", description = "Endpoints for related things for user")
public class MyController {

    @Autowired
    private AuthService authService;

    @Autowired
    private ChannelService channelService;

    @Autowired
    private PostService postService;

    @Autowired
    private ThreadService threadService;

    @Autowired
    private ReportService reportService;

    @Autowired
    private ReactionService reactionService;

    @Autowired
    private CommentService commentService;

    @GetMapping("/")
    @Operation(summary = "get logged in user", description = "get logged in user")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = AuthUserDTO.class)))
    public ResponseEntity<?> getMe(@AuthenticationPrincipal UserPrincipal userPrincipal) {

        try {
            AuthUserDTO authUserDTO = authService.getUser(getUsername(userPrincipal));
            return ResponseEntity.ok(authUserDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/channel")
    @Operation(summary = "user's subscribed channels")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = ChannelsPage.class)))
    public ResponseEntity<?> getMySubscribedChannels(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "desc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {

        try {
            Pageable pageable = PageRequest.of(page, size, Sort.Direction.fromString(order), sort);
            PageDTO<ChannelDTO> channels = channelService.getMyChannels(getUsername(user), pageable);
            return ResponseEntity.ok(channels);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/thread")
    @Operation(summary = "Get subscribed Threads")
    @ApiResponse(responseCode = "200", description = "Threads", content = @Content(schema = @Schema(implementation = ThreadsPage.class)))
    public ResponseEntity<?> getMySubscribedThreads(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "desc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {

        try {
            Pageable pageable = PageRequest.of(page, size, Direction.fromString(order), sort);
            PageDTO<ThreadDTO> threads = threadService.getMyThreads(getUsername(user), pageable);
            return ResponseEntity.ok(threads);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/post")
    @Operation(summary = "Get subscribed posts")
    @ApiResponse(responseCode = "200", description = "posts", content = @Content(schema = @Schema(implementation = PostsPage.class)))
    public ResponseEntity<?> getMySubscribedPosts(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "desc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {

        try {
            Pageable pageable = PageRequest.of(page, size, Direction.fromString(order), sort);
            PageDTO<PostDTO> posts = postService.getMyPosts(getUsername(user), pageable);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/report")
    @Operation(summary = "Get all reports by me")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = ReportsPage.class)))
    public ResponseEntity<?> getMyReports(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "desc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {

        try {
            Pageable pageable = PageRequest.of(page, size, Direction.fromString(order), sort);
            PageDTO<ReportDTO> reports = reportService.getMyReports(getUsername(user), pageable);
            return ResponseEntity.ok(reports);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/reaction")
    @Operation(summary = "Get all reactions by me")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = ReactionsPage.class)))
    public ResponseEntity<?> getMyReactions(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "updatedAt") String sort,
            @RequestParam(required = false, defaultValue = "desc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {

        try {
            Pageable pageable = PageRequest.of(page, size, Direction.fromString(order), sort);
            PageDTO<ReactionDTO> reactions = reactionService.getMyReactions(getUsername(user), pageable);
            return ResponseEntity.ok(reactions);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/comment")
    @Operation(summary = "Get all comments by me")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = CommentsPage.class)))
    public ResponseEntity<?> getMyComments(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "desc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {

        try {
            Pageable pageable = PageRequest.of(page, size, Direction.fromString(order), sort);
            PageDTO<CommentDTO> comments = commentService.getMyComments(getUsername(user), pageable);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    private String getUsername(UserPrincipal user) {
        return user != null ? user.getUsername() : null;
    }
}