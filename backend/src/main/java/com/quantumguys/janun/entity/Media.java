package com.quantumguys.janun.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Media extends BaseEntity{

    private String url;
    private String type;
    private String description;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

}
