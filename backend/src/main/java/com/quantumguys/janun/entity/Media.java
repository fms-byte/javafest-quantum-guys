package com.quantumguys.janun.entity;

import java.net.URL;

import jakarta.persistence.*;

@Entity
public class Media extends BaseEntity{

    private URL url;
    private String type;
    private String description;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    public Media() {
    }

    public URL getUrl() {
        return url;
    }

    public void setUrl(URL url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

}
