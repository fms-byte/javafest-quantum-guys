package com.quantumguys.janun.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    private Long views;
    private Long likesCount;
    private Long dislikesCount;
    private Long commentsCount;
    private Long sharesCount;
    private Long reportsCount;
    private Long tagCount;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thread_id")
    private Thread thread;

    @OneToMany(mappedBy = "post", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Reaction> reactions = new HashSet<>();

    @OneToMany(mappedBy = "post", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Tag> tags = new HashSet<>();

    @OneToMany(mappedBy = "post", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Media> media = new ArrayList<>();

    @OneToMany(mappedBy = "post", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Report> reports = new ArrayList<>();

    public void addTag(Tag tag){
        if(this.tags.contains(tag))return;
        
        this.tags.add(tag);
        this.tagCount++;
        tag.getPosts().add(this);
        tag.setPostCount(tag.getPostCount()+1);
    }

    public void addTag(Set<Tag> tags){
        tags.forEach(this::addTag);
    }

    public void removeTag(Tag tag){
        if(!this.tags.contains(tag))return;
        
        this.tags.remove(tag);
        this.tagCount--;
        tag.getPosts().remove(this);
        tag.setPostCount(tag.getPostCount()-1);
    }

    public void removeTag(Set<Tag> tags){
        tags.forEach(this::removeTag);
    }

    public void addMedia(Media media){
        this.media.add(media);
        media.setPost(this);
    }

    public void removeMedia(Media media){
        this.media.remove(media);
        media.setPost(null);
    }

    public void addReaction(Reaction reaction){
        this.reactions.add(reaction);
        if(reaction.getType().equals("like"))this.likesCount++;
        if(reaction.getType().equals("dislike"))this.dislikesCount++;

        reaction.setPost(this);
    }

    public void react(Reaction reaction){
        Reaction oldReaction = this.reactions.stream().filter(r -> r.getUser().getId().equals(reaction.getUser().getId())).findFirst().orElse(null);
        if(oldReaction == null){
            this.addReaction(reaction);
            return;
        }

        if(oldReaction.getType().equals(reaction.getType()))return;

        if(oldReaction.getType().equals("like"))this.likesCount--;
        if(oldReaction.getType().equals("dislike"))this.dislikesCount--;

        if(reaction.getType().equals("like"))this.likesCount++;
        if(reaction.getType().equals("dislike"))this.dislikesCount++;

        oldReaction.setType(reaction.getType());
    }

    public void removeReaction(Reaction reaction){
        this.reactions.remove(reaction);
        if(reaction.getType().equals("like"))this.likesCount--;
        if(reaction.getType().equals("dislike"))this.dislikesCount--;

        reaction.setPost(null);
    }

    public void addComment(Comment comment){
        this.comments.add(comment);
        comment.setPost(this);
    }

    public void removeComment(Comment comment){
        this.comments.remove(comment);
        comment.setPost(null);
    }

}