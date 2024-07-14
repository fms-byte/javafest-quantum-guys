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
import com.quantumguys.janun.dto.PageReportWrapper;
import com.quantumguys.janun.dto.ReportCreateDTO;
import com.quantumguys.janun.dto.ReportDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "9. Report", description = "Endpoints for testing.")
public class ReportController {

    // @Autowired
    // private ReportService reportService;

    @PostMapping("/report")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "create report", description = "create report")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = ReportDTO.class)))
    public ResponseEntity<?> createReport(@RequestBody ReportCreateDTO reportCreateDTO) {
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PutMapping("/report/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "update report", description = "update report")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = ReportDTO.class)))
    public ResponseEntity<?> updateReport(@PathVariable long id) {
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @DeleteMapping("/report/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "delete report", description = "delete report")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = GeneralResponseDTO.class)))
    public ResponseEntity<?> deleteReport(@PathVariable long id) {
        try {
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/report")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "Get Reports", description = "Get all reports")
    @ApiResponse(responseCode = "200", description = "Reports", content = @Content(schema = @Schema(implementation = PageReportWrapper.class)))
    public ResponseEntity<?> getReports(
                                        @RequestParam(required = false) String search, 
                                        @RequestParam(required = false, defaultValue = "createdAt") String sort, 
                                        @RequestParam(required = false, defaultValue = "asc") String order, 
                                        @RequestParam(required = false, defaultValue = "0") Integer page
                                        ){
        try {
            // Pageable pageable = PageRequest.of(page, 10, Sort.Direction.fromString(order),sort);
            // PageReportWrapper<ChannelDTO> channels = channelService.getChannels(pageable);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/report/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "Get Report", description = "Get a report")
    @ApiResponse(responseCode = "200", description = "Report", content = @Content(schema = @Schema(implementation = ReportDTO.class)))
    public ResponseEntity<?> getReport(@PathVariable long id) {
        try {
            // ChannelDTO channel = channelService.getChannel(slug);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }
}