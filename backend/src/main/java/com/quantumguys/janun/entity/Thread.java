package com.quantumguys.janun.entity;

import java.net.URL;
import java.util.List;

import jakarta.persistence.*;

@Entity
public class Thread extends BaseEntity{

    private String name;
    private String description;
    private String language;
    private String city;
    private String country;
    private URL logo;
    private URL cover;
    
    @ElementCollection
    private List<URL> links;

    private long subscriberCount;
    private long postCount;

    @ManyToOne
    @JoinColumn(name = "channel_id")
    private Channel channel;

    @OneToMany(mappedBy = "thread")
    private List<Post> posts;

    @ManyToMany
    private List<Tag> tags;

    @ManyToMany(mappedBy = "subscribedThreads")
    private List<AuthUser> subscribers;

    @OneToMany(mappedBy = "thread")
    private List<Report> reports;

    public Thread() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public URL getLogo() {
        return logo;
    }

    public void setLogo(URL logo) {
        this.logo = logo;
    }

    public URL getCover() {
        return cover;
    }

    public void setCover(URL cover) {
        this.cover = cover;
    }

    public List<URL> getLinks() {
        return links;
    }

    public void setLinks(List<URL> links) {
        this.links = links;
    }

    public long getSubscriberCount() {
        return subscriberCount;
    }

    public void setSubscriberCount(long subscriberCount) {
        this.subscriberCount = subscriberCount;
    }

    public long getPostCount() {
        return postCount;
    }

    public void setPostCount(long postCount) {
        this.postCount = postCount;
    }

    public Channel getChannel() {
        return channel;
    }

    public void setChannel(Channel channel) {
        this.channel = channel;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public List<AuthUser> getSubscribers() {
        return subscribers;
    }

    public void setSubscribers(List<AuthUser> subscribers) {
        this.subscribers = subscribers;
    }

    public List<Report> getReports() {
        return reports;
    }

    public void setReports(List<Report> reports) {
        this.reports = reports;
    }
    
}
