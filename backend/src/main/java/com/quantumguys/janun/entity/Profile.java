package com.quantumguys.janun.entity;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Profile extends BaseEntity {

    private String name;
    private String avatar;
    private String bio;
    private String city;
    private String country;

}
