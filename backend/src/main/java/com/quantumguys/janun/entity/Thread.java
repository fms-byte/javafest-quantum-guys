package com.quantumguys.janun.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"slug", "channel_id"}))
public class Thread extends BaseEntity{

    private String slug;

    private String name;
    private String description;
    private String language;
    private String city;
    private String country;
    private String logo;
    private String cover;
    
    @ElementCollection
    private Set<String> links = new HashSet<>();

    private long subscriberCount;
    private long postCount;
    private long tagCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    @OneToMany(mappedBy = "thread")
    private List<Post> posts = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Tag> tags = new HashSet<>();

    @ManyToMany(mappedBy = "subscribedThreads")
    private Set<AuthUser> subscribers = new HashSet<>();

    @OneToMany(mappedBy = "thread", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Report> reports = new ArrayList<>();

    public boolean isSubscribed(AuthUser user){
        return this.subscribers.contains(user);
    }

    public void addTag(Tag tag){
        if(this.tags.contains(tag))return;
        
        this.tags.add(tag);
        this.tagCount++;
        tag.getThreads().add(this);
        tag.setThreadCount(tag.getThreadCount()+1);
    }

    public void addTag(Set<Tag> tags){
        tags.forEach(this::addTag);
    }

    public void removeTag(Tag tag){
        if(!this.tags.contains(tag))return;
        
        this.tags.remove(tag);
        this.tagCount--;
        tag.getThreads().remove(this);
        tag.setThreadCount(tag.getThreadCount()-1);
    }

    public void removeTag(Set<Tag> tags){
        tags.forEach(this::removeTag);
    }
}
