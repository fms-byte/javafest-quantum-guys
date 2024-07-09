package com.quantumguys.janun.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quantumguys.janun.entity.AuthUser;

public interface AuthUserRepository extends JpaRepository<AuthUser, Long>{

    Optional<AuthUser> findByEmail(String email);
    Optional<AuthUser> findByUsername(String username);
    Optional<AuthUser> findByUsernameOrEmail(String username, String email);

    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);
}
