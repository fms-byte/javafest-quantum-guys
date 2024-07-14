package com.quantumguys.janun.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quantumguys.janun.dto.GeneralResponseDTO;
import com.quantumguys.janun.dto.PagePostWrapper;
import com.quantumguys.janun.security.UserPrincipal;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "4. Feed", description = "Endpoints for testing.")
public class FeedController {

    // @Autowired
    // private FeedService feedService;

    @GetMapping("/feed")
    @Operation(summary = "get feed", description = "get feed")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = PagePostWrapper.class)))
    public ResponseEntity<?> getFeed(@AuthenticationPrincipal UserPrincipal userPrincipal
                                    , @RequestParam(required = false) String search
                                    , @RequestParam(required = false, defaultValue = "createdAt") String sort
                                    , @RequestParam(required = false, defaultValue = "0") int page
                                    , @RequestParam(required = false, defaultValue = "10") int size){
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }
}