package com.quantumguys.janun.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private Set<Thread> subscribedThreads= new HashSet<>();

    @OneToMany(mappedBy = "user")
    private List<Report> reports = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private Set<Reaction> reactions = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();


    public void subscribe(Thread thread){
        if(this.subscribedThreads.contains(thread))return;
        if(thread.isPremium() && !this.isPremium())return;

        this.subscribedThreads.add(thread);
        this.subscribedThreadsCount++;
        thread.getSubscribers().add(this);
        thread.setSubscriberCount(thread.getSubscriberCount() + 1);
    }

    public void subscribe(Channel channel){
        if(channel.isPremium() && !this.isPremium())return;
        for (Thread thread : channel.getThreads()) {
            this.subscribe(thread);
        }
    }

    public void unsubscribe(Thread thread){
        if(!this.subscribedThreads.contains(thread))return;
        
        this.subscribedThreads.remove(thread);
        this.subscribedThreadsCount--;
        thread.getSubscribers().remove(this);
        thread.setSubscriberCount(thread.getSubscriberCount() - 1);
    }

    public void unsubscribe(Channel channel){
        for (Thread thread : channel.getThreads()) {
            this.unsubscribe(thread);
        }
    }

    public boolean isSubscribed(Thread thread){
        return this.subscribedThreads.contains(thread);
    }
    
}
