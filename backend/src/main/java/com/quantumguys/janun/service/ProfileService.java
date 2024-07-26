package com.quantumguys.janun.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quantumguys.janun.dto.ProfileDto;
import com.quantumguys.janun.entity.AuthUser;
import com.quantumguys.janun.entity.Profile;
import com.quantumguys.janun.repository.AuthUserRepository;

@Service
public class ProfileService {

    @Autowired
    private AuthUserRepository userRepository;

    public ProfileDto updateProfile(String username,ProfileDto profile) {
        AuthUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profileEntity = user.getProfile();
        if(profileEntity == null) profileEntity = new Profile(); // Add this line to avoid NullPointerException (NPE
        profileEntity.updateFromDto(profile);
        user.setProfile(profileEntity);
        user = userRepository.save(user);
        
        return user.getProfile().toDto(ProfileDto.class);
    }

    public ProfileDto getProfile(String username) {
        Profile profile = userRepository.findByUsername(username)
                            .orElseThrow(() -> new RuntimeException("User not found"))
                            .getProfile();

        if(profile == null) profile = new Profile(); // Add this line to avoid NullPointerException (NPE)
        return profile.toDto(ProfileDto.class);
    }

}
