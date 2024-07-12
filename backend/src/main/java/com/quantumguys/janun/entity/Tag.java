package com.quantumguys.janun.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Tag extends BaseEntity{

    @Column(unique = true)
    private String name;
    private String description;

    private long postCount;
    private long threadCount;
    private long channelCount;

    @ManyToMany(mappedBy = "tags")
    private List<Channel> channels;

    @ManyToMany(mappedBy = "tags")
    private List<Thread> threads;

    @ManyToMany(mappedBy = "tags")
    private List<Post> posts;
}