package com.quantumguys.janun.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;

import com.quantumguys.janun.dto.ChannelMinDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Channel extends BaseEntity {

    @Column(unique = true)
    private String slug;
    
    private String name;
    private String description;
    private String language;
    private String city;
    private String country;
    private String logo;
    private String cover;
    
    private long subscriberCount;
    private long postCount;
    private long linkCount;
    private long threadCount;
    private long tagCount;


    @ElementCollection
    private List<String> links = new ArrayList<>();
    
    @OneToMany(mappedBy = "channel", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Thread> threads = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.PERSIST)
    private Set<Tag> tags = new HashSet<>();


    public <T> T toDto(boolean isSubscribed, Class<T> clazz) {
        ModelMapper modelMapper = new ModelMapper();
        T dto = modelMapper.map(this, clazz);
        if(dto instanceof ChannelMinDTO){
            ((ChannelMinDTO) dto).setSubscribed(isSubscribed);
        }
        return dto;
    }
}
