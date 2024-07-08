package com.quantumguys.janun.controller;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quantumguys.janun.security.UserPrincipal;


@RestController
public class HelloController {

	@GetMapping("/")
	public String index(@AuthenticationPrincipal UserPrincipal userPrincipal) {
		if(userPrincipal != null) {
			return "Hello, " + userPrincipal.getUsername() + "! Welcome to Janun!\n"+
					"Your email is: " + userPrincipal.getEmail() + "\n"+
					"Your user id is: " + userPrincipal.getUserId()+"\n"+
					"Your role is: " + userPrincipal.getAuthorities();
		}
		return "Hello, Stranger!";
	}

	@GetMapping("/test")
	public String test(@AuthenticationPrincipal UserPrincipal userPrincipal) {
		return "Hello, " + userPrincipal.getEmail() + " " + userPrincipal.getUserId() + "!";
	}

	@GetMapping("/admin")
	public String admin() {
		return "Welcome to Janun, Admin!";
	}
	
}