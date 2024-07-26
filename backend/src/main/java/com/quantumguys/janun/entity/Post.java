package com.quantumguys.janun.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;

import com.quantumguys.janun.dto.PostMinDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Post extends BaseEntity{
    @Column(unique = true)
    private String slug;
    
    @Column(nullable = false)
    private String title;
    private String content;

    private String type = "post";
    private String status = "published";

    private long views;
    private long likesCount;
    private long dislikesCount;
    private long commentsCount;
    private long sharesCount;
    private long reportsCount;
    private long tagCount;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thread_id")
    private Thread thread;

    @OneToMany(mappedBy = "post", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Reaction> reactions = new HashSet<>();

    @OneToMany(mappedBy = "post", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.DETACH)
    private Set<Tag> tags = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Media> media = new ArrayList<>();

    @OneToMany(mappedBy = "post", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Report> reports = new ArrayList<>();

    public <T> T toDto(String reaction, boolean reported, boolean commented, boolean subscribed, Class<T> clazz){
        ModelMapper modelMapper = new ModelMapper();
        T dto = modelMapper.map(this, clazz);
        
        if(dto instanceof PostMinDTO){
            PostMinDTO postMinDTO = (PostMinDTO) dto;
            postMinDTO.setReaction(reaction);
            postMinDTO.setReacted(reaction!=null);
            postMinDTO.setReported(reported);
            postMinDTO.setCommented(commented);
            postMinDTO.setSubscribed(subscribed);
        }

        return dto;
    }

}