package com.quantumguys.janun.entity;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

import org.modelmapper.ModelMapper;

import com.quantumguys.janun.util.Utility;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@MappedSuperclass
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private boolean deleted = false;
    private boolean hidden = false;
    private boolean premium = false;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public <T> T toDto(Class<T> clazz) {
        ModelMapper modelMapper = new ModelMapper();
        T dto = modelMapper.map(this, clazz);

        try {
            dto.getClass().getMethod("setCreatedAt", String.class).invoke(dto,
                    getCreatedAt().format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm")));
            dto.getClass().getMethod("setUpdatedAt", String.class).invoke(dto,
                    getUpdatedAt().format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm")));
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            long seconds = LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(6))
                    - getCreatedAt().toEpochSecond(ZoneOffset.ofHours(6));
            dto.getClass().getMethod("setCreatedAgo", String.class).invoke(dto,
                    Utility.secToTime(seconds) + " ago");
            seconds = LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(6))
                    - getUpdatedAt().toEpochSecond(ZoneOffset.ofHours(6));
            dto.getClass().getMethod("setUpdatedAgo", String.class).invoke(dto,
                    Utility.secToTime(seconds) + " ago");
        } catch (Exception e) {
            e.printStackTrace();
        }

        return dto;
    }

    public void updateFromDto(Object dto) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.map(dto, this);
    }
}
