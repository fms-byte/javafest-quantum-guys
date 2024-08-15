package com.quantumguys.janun.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quantumguys.janun.dto.GeneralResponseDTO;
import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.dto.PostsPage;
import com.quantumguys.janun.dto.PostDTO;
import com.quantumguys.janun.security.UserPrincipal;
import com.quantumguys.janun.service.PostService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "04. Feed", description = "Endpoints for Feed.")
public class FeedController {

    @Autowired
    private PostService postService;

    @GetMapping("/feed")
    @Operation(summary = "get feed", description = "get feed")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PostsPage.class)))
    public ResponseEntity<?> getFeed(@AuthenticationPrincipal UserPrincipal user,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "desc") String order,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, Math.min(20, size), Direction.fromString(order), sort);
            PageDTO<PostDTO> pageDTO = postService.getPosts(getUserName(user), pageable);
            return ResponseEntity.ok(pageDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    private String getUserName(UserPrincipal user) {
        return user == null ? null : user.getUsername();
    }
}