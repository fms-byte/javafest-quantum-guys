package com.quantumguys.janun.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

import com.quantumguys.janun.dto.ChannelCreateRequestDTO;
import com.quantumguys.janun.dto.ChannelDTO;
import com.quantumguys.janun.dto.GeneralResponseDTO;
import com.quantumguys.janun.dto.ChannelsPage;
import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.dto.PostsPage;
import com.quantumguys.janun.dto.PostDTO;
import com.quantumguys.janun.security.UserPrincipal;
import com.quantumguys.janun.service.ChannelService;
import com.quantumguys.janun.service.PostService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "05. Channel", description = "Channel API\n" +
        "## Public Endpoints:\n" +
        "- **/channel:** Get all channels\n" +
        "- **/channel/{slug}:** Get channel by slug\n" +
        "- **/channel/{slug}/posts:** Get posts in a channel\n" +
        "## Private Endpoints:\n" +
        "- ### User\n" +
        "- **/channel/{slug}/subscribe:** Subscribe to a channel\n" +
        "- **/channel/{slug}/unsubscribe:** Unsubscribe from a channel\n"+
        "- ### Admin\n" +
        "- **/channel:** Create a new channel\n" +
        "- **/channel/{slug}:** Delete a channel\n" +
        "- ### Manager\n" +
        "- **/channel/{slug}:** Update a channel\n" +
        ""
        )
public class ChannelController {

    @Autowired
    private ChannelService channelService;

    @Autowired
    private PostService postService;

    @GetMapping("/channel")
    @Operation(summary = "Get Channels", description = "Get all channels")
    @ApiResponse(responseCode = "200", description = "Channels", content = @Content(schema = @Schema(implementation = ChannelsPage.class)))
    public ResponseEntity<?> getChannels(
                                        @AuthenticationPrincipal UserPrincipal user, 
                                        @RequestParam(required = false) String search, 
                                        @RequestParam(required = false, defaultValue = "name") String sort, 
                                        @RequestParam(required = false, defaultValue = "asc") String order, 
                                        @RequestParam(required = false, defaultValue = "0") Integer page,
                                        @RequestParam(required = false, defaultValue = "10") Integer size
                                        ){
        try {
            Pageable pageable = PageRequest.of(page, Math.min(20, size), Sort.Direction.fromString(order),sort);
            PageDTO<ChannelDTO> channels = channelService.getChannels(getUsername(user), pageable);
            return ResponseEntity.ok(channels);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/channel/{slug}")
    @Operation(summary = "Get Channel", description = "Get channel by slug")
    @ApiResponse(responseCode = "200", description = "Channel", content = @Content(schema = @Schema(implementation = ChannelDTO.class)))
    public ResponseEntity<?> getChannel(@AuthenticationPrincipal UserPrincipal user, @PathVariable String slug) {
        try {
            ChannelDTO channel = channelService.getChannel(getUsername(user), slug);
            return ResponseEntity.ok(channel);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/channel")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Create Channel", description = "Create a new channel")
    @ApiResponse(responseCode = "200", description = "Channel", content = @Content(schema = @Schema(implementation = ChannelDTO.class)))
    public ResponseEntity<?> createChannel(@AuthenticationPrincipal UserPrincipal user, @RequestBody ChannelCreateRequestDTO channelCreateDTO) {
        try {
            ChannelDTO channel = channelService.createChannel(getUsername(user), channelCreateDTO);
            return ResponseEntity.ok(channel);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PutMapping("/channel/{slug}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "Update Channel", description = "Update a channel")
    @ApiResponse(responseCode = "200", description = "Channel", content = @Content(schema = @Schema(implementation = ChannelDTO.class)))
    public ResponseEntity<?> updateChannel(@AuthenticationPrincipal UserPrincipal user, @PathVariable String slug, @RequestBody ChannelCreateRequestDTO channelUpdateDTO) {
        try {
            ChannelDTO channel = channelService.updateChannel(getUsername(user), slug, channelUpdateDTO);
            return ResponseEntity.ok(channel);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @DeleteMapping("/channel/{slug}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Delete Channel", description = "Delete a channel")
    @ApiResponse(responseCode = "200", description = "Channel", content = @Content(schema = @Schema(implementation = GeneralResponseDTO.class)))
    public ResponseEntity<?> deleteChannel(@AuthenticationPrincipal UserPrincipal user, @PathVariable String slug) {
        try {
            channelService.hideChannel(getUsername(user), slug);
            return ResponseEntity.ok().body(new GeneralResponseDTO("Channel hidden successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }


    @PostMapping("/channel/{slug}/subscribe")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Subscribe to Channel", description = "Subscribe to a channel. If user is subscribed to any thread "
                                                             + "in the channel then nothing will happen. Otherwise, user will be "
                                                             + "subscribed to all threads in the channel.")
    @ApiResponse(responseCode = "200", description = "Channel", content = @Content(schema = @Schema(implementation = ChannelDTO.class)))
    public ResponseEntity<?> subscribeChannel(@AuthenticationPrincipal UserPrincipal user, @PathVariable String slug) {
        try {
            ChannelDTO channelDTO = channelService.subscribeChannel(getUsername(user), slug);
            return ResponseEntity.ok(channelDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/channel/{slug}/unsubscribe")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Unsubscribe from Channel", description = "Unsubscribe from a channel. If user is not subscribed to any thread "
                                                               + "in the channel then nothing will happen. Otherwise, user will be "
                                                               + "unsubscribed from all threads in the channel.")
    @ApiResponse(responseCode = "200", description = "Channel", content = @Content(schema = @Schema(implementation = ChannelDTO.class)))
    public ResponseEntity<?> unsubscribeChannel(@AuthenticationPrincipal UserPrincipal user, @PathVariable String slug) {
        try {
            ChannelDTO channelDTO = channelService.unsubscribeChannel(getUsername(user), slug);
            return ResponseEntity.ok(channelDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/channel/{slug}/posts")
    @Operation(summary = "Get Posts", description = "Get posts in a channel")
    @ApiResponse(responseCode = "200", description = "Posts", content = @Content(schema = @Schema(implementation = PostsPage.class)))
    public ResponseEntity<?> getPostsInChannel(@AuthenticationPrincipal UserPrincipal user,
                                               @PathVariable String slug, 
                                               @RequestParam(required = false) String search, 
                                               @RequestParam(required = false, defaultValue = "createdAt") String sort, 
                                               @RequestParam(required = false, defaultValue = "desc") String order, 
                                               @RequestParam(required = false, defaultValue = "0") Integer page,
                                               @RequestParam(required = false, defaultValue = "10") Integer size
                                               ){
        try {
            Pageable pageable = PageRequest.of(page, Math.min(20, size), Sort.Direction.fromString(order), sort);
            PageDTO<PostDTO> posts = postService.getChannelPosts(getUsername(user), slug, pageable);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    private String getUsername(UserPrincipal user) {
        return user != null ? user.getUsername() : null;
    }

}