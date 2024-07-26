package com.quantumguys.janun.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;

import com.quantumguys.janun.dto.ThreadMinDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"slug", "channel_id"}))
public class Thread extends BaseEntity{

    private String slug;

    private String name;
    private String description;
    private String language;
    private String city;
    private String country;
    private String logo;
    private String cover;
    
    @ElementCollection
    private List<String> links = new ArrayList<>();

    private long subscriberCount;
    private long postCount;
    private long tagCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    @OneToMany(mappedBy = "thread")
    private List<Post> posts = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Tag> tags = new HashSet<>();

    @ManyToMany(mappedBy = "subscribedThreads", cascade = CascadeType.ALL)
    private List<AuthUser> subscribers = new ArrayList<>();

    @OneToMany(mappedBy = "thread", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Report> reports = new ArrayList<>();

    public <T> T toDto(boolean isSubscribed, Class<T> clazz) {
        ModelMapper modelMapper = new ModelMapper();
        T dto = modelMapper.map(this, clazz);
        if(dto instanceof ThreadMinDTO){
            ((ThreadMinDTO) dto).setSubscribed(isSubscribed);
        }
        return dto;
    }
}
