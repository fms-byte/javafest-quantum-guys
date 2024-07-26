package com.quantumguys.janun.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class AuthUser extends BaseEntity{
    private LocalDateTime lastLogin;
    private LocalDateTime lastLogout;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    private String phone;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private Profile profile = new Profile();

    @Column(columnDefinition = "varchar(255) default 'user'")
    private String role;

    @Column(columnDefinition = "boolean default false")
    private boolean emailConfirmed;

    @Column(columnDefinition = "boolean default false")
    private boolean banned;

    private long subscribedThreadsCount;
    private long reportsCount;

    @ManyToMany
    private List<Thread> subscribedThreads= new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Report> reports = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Reaction> reactions = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();
}
