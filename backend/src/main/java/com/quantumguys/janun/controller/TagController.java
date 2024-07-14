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

import com.quantumguys.janun.dto.GeneralResponseDTO;
import com.quantumguys.janun.dto.PagePostWrapper;
import com.quantumguys.janun.dto.PageTagWrapper;
import com.quantumguys.janun.dto.TagCreateDTO;
import com.quantumguys.janun.dto.TagDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "8. Tag", description = "Endpoints for managing tags.")
public class TagController {

    // @Autowired
    // private TagService tagService;

    @PostMapping("/tag")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "create tag", description = "tag")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = TagDTO.class)))
    public ResponseEntity<?> createTag(@RequestBody TagCreateDTO tagCreateDTO) {
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PutMapping("/tag/{slug}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "update tag", description = "tag")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = TagDTO.class)))
    public ResponseEntity<?> updateTag(@RequestBody TagCreateDTO tagCreateDTO) {
        try {
            return ResponseEntity.ok(null);
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
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/tag")
    @Operation(summary = "Get Tags", description = "Get all tags")
    @ApiResponse(responseCode = "200", description = "Tags", content = @Content(schema = @Schema(implementation = PageTagWrapper.class)))
    public ResponseEntity<?> getTags(
                                    @RequestParam(required = false) String search,
                                    @RequestParam(required = false, defaultValue = "createdAt") String sort,
                                    @RequestParam(required = false, defaultValue = "asc") String order,
                                    @RequestParam(required = false, defaultValue = "0") Integer page
                                    ){
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/tag/{slug}")
    @Operation(summary = "Get Tag", description = "Get tag by slug")
    @ApiResponse(responseCode = "200", description = "Tag", content = @Content(schema = @Schema(implementation = TagDTO.class)))
    public ResponseEntity<?> getTag(@PathVariable String slug) {
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/tag/{slug}/posts")
    @Operation(summary = "Get Posts", description = "Get all posts in a tag")
    @ApiResponse(responseCode = "200", description = "Posts", content = @Content(schema = @Schema(implementation = PagePostWrapper.class)))
    public ResponseEntity<?> getPosts(
                                       @RequestParam(required = false) String search,
                                       @RequestParam(required = false, defaultValue = "createdAt") String sort,
                                       @RequestParam(required = false, defaultValue = "asc") String order,
                                       @RequestParam(required = false, defaultValue = "0") Integer page
                                       ){
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }
}