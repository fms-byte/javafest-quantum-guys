package com.quantumguys.janun.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Channel extends BaseEntity {

    @Column(unique = true)
    private String slug;
    
    private String name;
    private String description;
    private String language;
    private String city;
    private String country;
    private String logo;
    private String cover;
    
    private long subscriberCount;
    private long postCount;
    private long linkCount;
    private long threadCount;
    private long tagCount;


    @ElementCollection
    private Set<String> links = new HashSet<>();
    
    @OneToMany(mappedBy = "channel", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Thread> threads = new HashSet<>();

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Tag> tags = new HashSet<>();
    

    public void addTag(Tag tag){
        if(this.tags.contains(tag))return;
        
        this.tags.add(tag);
        this.tagCount++;
        tag.getChannels().add(this);
        tag.setChannelCount(tag.getChannelCount()+1);
    }

    public void addTag(Set<Tag> tags){
        tags.forEach(this::addTag);
    }

    public void removeTag(Tag tag){
        if(!this.tags.contains(tag))return;
        
        this.tags.remove(tag);
        this.tagCount--;
        tag.getChannels().remove(this);
        tag.setChannelCount(tag.getChannelCount()-1);
    }

    public void removeTag(Set<Tag> tags){
        tags.forEach(this::removeTag);
    }
}
