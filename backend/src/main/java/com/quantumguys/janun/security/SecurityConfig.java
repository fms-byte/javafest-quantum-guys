package com.quantumguys.janun.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
public class SecurityConfig {

    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, CustomUserDetailsService customUserDetailsService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.customUserDetailsService = customUserDetailsService;
    }

   @Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

       http
               .cors(cors -> cors.disable())
               .csrf(csrf -> csrf.disable())
               .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .formLogin(login -> login.disable())
               .securityMatcher("/**")
               .authorizeHttpRequests(registry -> registry
                            //    .requestMatchers("/").permitAll()
                            //    .requestMatchers("/auth/register", "/auth/login", "/auth/confirm","/auth/forgot-password", "/auth/reset-password","/auth/check-username").permitAll()
                            //    .requestMatchers("/profile/**").permitAll()

                            //    .requestMatchers("/swagger-ui/**","/v3/api-docs/**").permitAll()
                               
                            //    .requestMatchers("/admin/**").hasAuthority("ADMIN")
                               .anyRequest().permitAll()
               );

            return http.build();
	}

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder())
                .and().build();
    }
}