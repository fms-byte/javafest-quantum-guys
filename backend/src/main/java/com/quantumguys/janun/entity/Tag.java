package com.quantumguys.janun.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"name"}))
public class Tag extends BaseEntity{

    @Column(unique = true)
    private String name;
    private String description;

    private long postCount;
    private long threadCount;
    private long channelCount;

    @ManyToMany(mappedBy = "tags")
    private Set<Channel> channels = new HashSet<>();

    @ManyToMany(mappedBy = "tags")
    private Set<Thread> threads = new HashSet<>();

    @ManyToMany(mappedBy = "tags")
    private Set<Post> posts = new HashSet<>();

    public Tag(String name) {
        this.name = name;
    }
    
    public Tag(String name, String description) {
        this.name = name;
        this.description = description;
    }
}