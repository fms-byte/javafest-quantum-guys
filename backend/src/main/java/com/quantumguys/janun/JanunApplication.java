package com.quantumguys.janun;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class JanunApplication {

	public static void main(String[] args) {
		SpringApplication.run(JanunApplication.class, args);
	}

}
