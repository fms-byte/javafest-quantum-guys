package com.quantumguys.janun.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Report extends BaseEntity{

    private String reason;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AuthUser user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @ManyToOne
    @JoinColumn(name = "thread_id")
    private Thread thread;
}
