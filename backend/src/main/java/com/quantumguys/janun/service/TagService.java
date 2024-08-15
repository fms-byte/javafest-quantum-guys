package com.quantumguys.janun.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.dto.TagCreateRequestDTO;
import com.quantumguys.janun.dto.TagDTO;
import com.quantumguys.janun.entity.Tag;
import com.quantumguys.janun.repository.TagRepository;

@Service
@Transactional
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    public Tag findTag(String name) {
        return tagRepository.findByName(name).orElse(null);
    }

    public Tag getTag(Tag tag) {
        return tagRepository.findByName(tag.getName()).orElse(tag);
    }

    public Tag getTag(String name) {
        return tagRepository.findByName(name).orElse(null);
    }

    public Tag save(Tag tag) {
        return tagRepository.save(tag);
    }

    public void deleteTag(Tag tag) {
        tagRepository.delete(tag);
    }

    public void hideTag(Tag tag) {
        tag.setHidden(true);
        save(tag);
    }

    public void hideTag(String name) {
        Tag tag = findTag(name);
        if (tag == null) {
            throw new RuntimeException("Tag not found");
        }
        hideTag(tag);
    }

    public TagDTO createTag(TagCreateRequestDTO tagCreateDTO) {
        Tag tag = new Tag();
        tag.updateFromDto(tagCreateDTO);
        tag = save(tag);
        return tag.toDto(TagDTO.class);
    }

    public TagDTO updateTag(String slug, TagCreateRequestDTO tagCreateDTO) {
        Tag tag = findTag(slug);
        if (tag == null) {
            throw new RuntimeException("Tag not found");
        }
        tag.updateFromDto(tagCreateDTO);
        tag = save(tag);
        return tag.toDto(TagDTO.class);
    }

    public PageDTO<TagDTO> getTags(Pageable pageable) {
        return new PageDTO<TagDTO>(tagRepository.findAll(pageable).map(tag -> tag.toDto(TagDTO.class)));
    }

}