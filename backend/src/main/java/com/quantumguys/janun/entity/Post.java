package com.quantumguys.janun.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    private Long views;
    private Long likesCount;
    private Long dislikesCount;
    private Long commentsCount;
    private Long sharesCount;
    private Long reportsCount;


    @ManyToOne
    @JoinColumn(name = "thread_id")
    private Thread thread;

    @OneToMany(mappedBy = "post")
    private List<Reaction> reactions = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();

    @ManyToMany
    private List<Tag> tags = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<Media> media = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<Report> reports = new ArrayList<>();
}