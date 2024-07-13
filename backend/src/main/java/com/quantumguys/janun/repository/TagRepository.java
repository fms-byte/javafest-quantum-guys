package com.quantumguys.janun.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quantumguys.janun.entity.Tag;


public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByName(String name);
    List<Tag> findByChannels_Slug(String slug);
}