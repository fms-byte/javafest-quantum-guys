package com.quantumguys.janun.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quantumguys.janun.entity.Tag;


public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByName(String name);
    List<Tag> findByChannels_Slug(String slug);

    default Tag getTag(Tag tag) {
        return findByName(tag.getName()).orElse(tag);
    }

    default Tag findTag(String name) {
        return findByName(name).orElse(null);
    }

    default Tag getTag(String name) {
        return findByName(name).orElse(new Tag(name));
    }

    default Set<Tag> getTags(Set<String> names) {
        return names.stream().map(this::getTag).collect(Collectors.toSet());
    }


}