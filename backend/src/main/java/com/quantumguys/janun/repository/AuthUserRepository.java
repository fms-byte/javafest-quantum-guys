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
    Boolean existsByUsernameAndPremium(String username, boolean premium);

    default boolean isPremium(String username) {
        if(username == null) return false;
        return existsByUsernameAndPremium(username, true);
    }

    default Optional<AuthUser> getUser(String username) {
        return findByUsername(username);
    }
}
