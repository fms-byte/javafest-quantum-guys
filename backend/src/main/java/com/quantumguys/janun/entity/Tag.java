package com.quantumguys.janun.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
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

    public Tag(String name) {
        this.name = name;
    }
    
    public Tag(String name, String description) {
        this.name = name;
        this.description = description;
    }
}