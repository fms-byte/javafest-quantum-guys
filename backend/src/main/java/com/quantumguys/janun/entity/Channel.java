package com.quantumguys.janun.entity;

import java.net.URL;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Channel extends BaseEntity {

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
    

    @OneToMany(mappedBy = "channel")
    private List<Thread> threads;

    private long threadCount;

    @ManyToMany
    private List<Tag> tags;

    private long tagCount;

    public Channel() {
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


    public List<Thread> getThreads() {
        return threads;
    }


    public void setThreads(List<Thread> threads) {
        this.threads = threads;
    }


    public List<Tag> getTags() {
        return tags;
    }


    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }


    public long getThreadCount() {
        return threadCount;
    }


    public void setThreadCount(long threadCount) {
        this.threadCount = threadCount;
    }


    public long getTagCount() {
        return tagCount;
    }


    public void setTagCount(long tagCount) {
        this.tagCount = tagCount;
    }
}
