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
import com.quantumguys.janun.dto.TagsPage;
import com.quantumguys.janun.dto.TagCreateRequestDTO;
import com.quantumguys.janun.dto.TagDTO;
import com.quantumguys.janun.security.UserPrincipal;
import com.quantumguys.janun.service.PostService;
import com.quantumguys.janun.service.TagService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "08. Tag", description = "Endpoints for managing tags.")
public class TagController {

    @Autowired
    private TagService tagService;

    @Autowired
    private PostService postService;

    @PostMapping("/tag")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "create tag", description = "tag")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = TagDTO.class)))
    public ResponseEntity<?> createTag(@RequestBody TagCreateRequestDTO tagCreateDTO) {
        try {
            TagDTO tagDTO = tagService.createTag(tagCreateDTO);
            return ResponseEntity.ok(tagDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PutMapping("/tag/{slug}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "update tag", description = "tag")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = TagDTO.class)))
    public ResponseEntity<?> updateTag(
            @RequestParam String slug,
            @RequestBody TagCreateRequestDTO tagCreateDTO) {
        try {
            TagDTO tagDTO = tagService.updateTag(slug,tagCreateDTO);
            return ResponseEntity.ok(tagDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @DeleteMapping("/tag/{slug}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "delete tag", description = "tag")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = GeneralResponseDTO.class)))
    public ResponseEntity<?> deleteTag(@PathVariable String slug) {
        try {
            tagService.hideTag(slug);
            return ResponseEntity.ok(new GeneralResponseDTO("Tag hidden"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/tag")
    @Operation(summary = "Get Tags", description = "Get all tags")
    @ApiResponse(responseCode = "200", description = "Tags", content = @Content(schema = @Schema(implementation = TagsPage.class)))
    public ResponseEntity<?> getTags(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {
        try {
            Pageable pageable = PageRequest.of(page, Math.min(20, size), Direction.fromString(order), sort);
            PageDTO<TagDTO> tags = tagService.getTags(pageable);
            return ResponseEntity.ok(tags);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/tag/{slug}")
    @Operation(summary = "Get Tag", description = "Get tag by slug")
    @ApiResponse(responseCode = "200", description = "Tag", content = @Content(schema = @Schema(implementation = TagDTO.class)))
    public ResponseEntity<?> getTag(@PathVariable String slug) {
        try {
            TagDTO tag = tagService.getTag(slug).toDto(TagDTO.class);
            return ResponseEntity.ok(tag);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/tag/{slug}/posts")
    @Operation(summary = "Get Posts", description = "Get all posts in a tag")
    @ApiResponse(responseCode = "200", description = "Posts", content = @Content(schema = @Schema(implementation = PostsPage.class)))
    public ResponseEntity<?> getPostsInTag(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String slug,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {
        try {
            Pageable pageable = PageRequest.of(page, Math.min(20, size), Direction.fromString(order), sort);
            return ResponseEntity.ok(postService.getTagPosts(getUsername(user), slug, pageable));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    private String getUsername(UserPrincipal user) {
        return user == null ? null : user.getUsername();
    }
}