package com.quantumguys.janun.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Reaction extends BaseEntity{

    private String type;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;
    
}