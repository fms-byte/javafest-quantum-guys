package com.quantumguys.janun.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;


@Entity
public class AuthUser extends BaseEntity{
    private LocalDateTime lastLogin;
    private LocalDateTime lastLogout;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;
    
    private String password;
    private String phone;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private Profile profile;

    @Column(columnDefinition = "varchar(255) default 'user'")
    private String role;

    @Column(columnDefinition = "boolean default false")
    private boolean emailConfirmed;

    @Column(columnDefinition = "boolean default false")
    private boolean banned;

    @ManyToMany
    private List<Thread> subscribedThreads;

    private long subscribedThreadsCount;

    @OneToMany(mappedBy = "user")
    private List<Report> reports;

    private long reportsCount;

    public AuthUser() {
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    public LocalDateTime getLastLogout() {
        return lastLogout;
    }

    public void setLastLogout(LocalDateTime lastLogout) {
        this.lastLogout = lastLogout;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isEmailConfirmed() {
        return emailConfirmed;
    }

    public void setEmailConfirmed(boolean emailConfirmed) {
        this.emailConfirmed = emailConfirmed;
    }

    public boolean isBanned() {
        return banned;
    }

    public void setBanned(boolean banned) {
        this.banned = banned;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public List<Thread> getSubscribedThreads() {
        return subscribedThreads;
    }

    public void setSubscribedThreads(List<Thread> subscribedThreads) {
        this.subscribedThreads = subscribedThreads;
    }

    public List<Report> getReports() {
        return reports;
    }

    public void setReports(List<Report> reports) {
        this.reports = reports;
    }

    public long getSubscribedThreadsCount() {
        return subscribedThreadsCount;
    }

    public void setSubscribedThreadsCount(long subscribedThreadsCount) {
        this.subscribedThreadsCount = subscribedThreadsCount;
    }

    public long getReportsCount() {
        return reportsCount;
    }

    public void setReportsCount(long reportsCount) {
        this.reportsCount = reportsCount;
    }

    
}
