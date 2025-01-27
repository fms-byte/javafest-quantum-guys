package com.quantumguys.janun.controller;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quantumguys.janun.security.UserPrincipal;

import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@Tag(name = "01. Hello", description = "Endpoints for basic testing")
public class HelloController {

	@GetMapping("/")
	public String testUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
		if(userPrincipal != null) {
			return "Hello, " + userPrincipal.getUsername() + "! Welcome to Janun!\n"+
					"Your email is: " + userPrincipal.getEmail() + "\n"+
					"Your user id is: " + userPrincipal.getUserId()+"\n"+
					"Your role is: " + userPrincipal.getAuthorities();
		}
		return "Hello, Stranger!";
	}

	@GetMapping("/test")
	@PreAuthorize("hasAuthority('MANAGER')")
	public String testManager(@AuthenticationPrincipal UserPrincipal userPrincipal) {
		return "Hello, " + userPrincipal.getUsername() + "! Welcome to Janun! You are a manager!";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasAuthority('ADMIN')")
	public String testAdmin(@AuthenticationPrincipal UserPrincipal userPrincipal) {
		return "Hello, " + userPrincipal.getUsername() + "! Welcome to Janun! You are an admin!";
	}
	
}