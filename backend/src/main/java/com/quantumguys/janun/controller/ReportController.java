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
import com.quantumguys.janun.dto.ReportsPage;
import com.quantumguys.janun.dto.ReportCreateRequestDTO;
import com.quantumguys.janun.dto.ReportDTO;
import com.quantumguys.janun.dto.ReportUpdateRequestDTO;
import com.quantumguys.janun.security.UserPrincipal;
import com.quantumguys.janun.service.ReportService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "09. Report", description = "Endpoints for testing.")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/report")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "create report", description = "create report")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = ReportDTO.class)))
    public ResponseEntity<?> createReport( @AuthenticationPrincipal UserPrincipal user, @RequestBody ReportCreateRequestDTO reportCreateDTO) {
        try {
            ReportDTO reportDTO = reportService.report(getUsername(user), reportCreateDTO);
            return ResponseEntity.ok(reportDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @PutMapping("/report/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "update report", description = "update report")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = ReportDTO.class)))
    public ResponseEntity<?> updateReport( 
                                            @AuthenticationPrincipal UserPrincipal user,
                                            @PathVariable long id,
                                            @RequestBody ReportUpdateRequestDTO reportUpdateDTO
                                            ) {
        try {
            ReportDTO reportDTO = reportService.updateReport(id, reportUpdateDTO);
            return ResponseEntity.ok(reportDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @DeleteMapping("/report/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "delete report", description = "delete report")
    @ApiResponse(responseCode = "200", description = "test", content = @Content(schema = @Schema(implementation = GeneralResponseDTO.class)))
    public ResponseEntity<?> deleteReport( @AuthenticationPrincipal UserPrincipal user,@PathVariable long id) {
        try {
            reportService.deleteReport(id);
            return ResponseEntity.ok(new GeneralResponseDTO("Report deleted"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/report")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "Get Reports", description = "Get all reports")
    @ApiResponse(responseCode = "200", description = "Reports", content = @Content(schema = @Schema(implementation = ReportsPage.class)))
    public ResponseEntity<?> getReports(
                                        @AuthenticationPrincipal UserPrincipal user,
                                        @RequestParam(required = false) String search, 
                                        @RequestParam(required = false, defaultValue = "createdAt") String sort, 
                                        @RequestParam(required = false, defaultValue = "asc") String order, 
                                        @RequestParam(required = false, defaultValue = "0") Integer page,
                                        @RequestParam(required = false, defaultValue = "10") Integer size
                                        ){
        try {
            Pageable pageable = PageRequest.of(page, Math.min(20, size), Direction.fromString(order),sort);
            PageDTO<ReportDTO> reports = reportService.getReports(pageable);
            return ResponseEntity.ok(reports);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }

    @GetMapping("/report/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    @Operation(summary = "Get Report", description = "Get a report")
    @ApiResponse(responseCode = "200", description = "Report", content = @Content(schema = @Schema(implementation = ReportDTO.class)))
    public ResponseEntity<?> getReport(@AuthenticationPrincipal UserPrincipal user, @PathVariable long id) {
        try {
            return ResponseEntity.ok(reportService.getReport(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponseDTO(e.getMessage()));
        }
    }
    
    private String getUsername(UserPrincipal user) {
        return user != null ? user.getUsername() : null;
    }
}